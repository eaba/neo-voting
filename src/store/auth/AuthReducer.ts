import {ReducerWrapper} from '@simpli/redux-wrapper'
import {CLIENT_EVENTS} from '@walletconnect/client'
import {PairingTypes} from '@walletconnect/types'
import QRCodeModal from '@walletconnect/qrcode-modal'
import {ERROR, getAppMetadata, getError} from '@walletconnect/utils'
import type {SessionTypes} from '@walletconnect/types'
import {Client} from '@walletconnect/client/dist/cjs/client'
import {ClientDispatcher} from '~src/store/auth/dispatchers/ClientDispatcher'
import {SessionDispatcher} from '~src/store/auth/dispatchers/SessionDispatcher'
import {GasBalanceDispatcher} from '~src/store/auth/dispatchers/GasBalanceDispatcher'
import {UriDispatcher} from '~src/store/auth/dispatchers/UriDispatcher'
import {PairingsDispatcher} from '~src/store/auth/dispatchers/PairingsDispatcher'
import {AccountsDispatcher} from '~src/store/auth/dispatchers/AccountsDispatcher'
import {Config} from '~src/app/Config'

export class AuthReducer extends ReducerWrapper<
  AuthType,
  AuthState,
  AuthAction
> {
  protected readonly initialState: AuthState = {
    client: null,
    session: null,
    gasBalance: null,
    uri: null,
    pairings: null,
    accounts: null,
  }

  protected readonly dispatchers = [
    ClientDispatcher,
    SessionDispatcher,
    GasBalanceDispatcher,
    UriDispatcher,
    PairingsDispatcher,
    AccountsDispatcher,
  ]

  readonly getters = (state: RootState) => ({
    auth: state.auth,
    isConnected: Boolean(state.auth.session),
  })

  readonly actions = {
    init: (): AsyncAction => {
      return async (dispatch) => {
        try {
          const client = await Client.init({
            logger: Config.app.DEFAULT_LOGGER,
            relayProvider: Config.app.DEFAULT_RELAY_PROVIDER,
          })

          dispatch(this.commit('SET_CLIENT', {client}))

          await dispatch(this.actions.subscribeToEvents())
          await dispatch(this.actions.checkPersistedState())
        } catch (e) {
          throw e
        }
      }
    },

    connect: (pairing?: {topic: string}): AsyncAction => {
      return async (dispatch, getState) => {
        const {client} = getState().auth

        if (!client) {
          throw new Error('WalletConnect is not initialized')
        }

        console.info('connect', pairing)

        try {
          const session = await client.connect({
            metadata: getAppMetadata() ?? Config.app.DEFAULT_APP_METADATA,
            pairing,
            permissions: {
              blockchain: {
                chains: [Config.app.DEFAULT_CHAIN_ID],
              },
              jsonrpc: {
                methods: Config.app.DEFAULT_METHODS,
              },
            },
          })

          dispatch(this.commit('SET_SESSION', {session}))
          dispatch(
            this.commit('SET_ACCOUNTS', {accounts: session.state.accounts})
          )
        } catch (e) {
          // ignore rejection
        }

        // close modal in case it was open
        QRCodeModal.close()
      }
    },

    disconnect: (): AsyncAction => {
      return async (dispatch, getState) => {
        const {client, session} = getState().auth

        if (!client) {
          throw new Error('WalletConnect is not initialized')
        }

        if (!session) {
          throw new Error('Session is not connected')
        }

        await client.disconnect({
          topic: session.topic,
          reason: getError(ERROR.USER_DISCONNECTED),
        })

        await dispatch(this.actions.reset())
      }
    },

    subscribeToEvents: (): AsyncAction => {
      return async (dispatch, getState) => {
        const {client} = getState().auth

        client?.on(
          CLIENT_EVENTS.pairing.proposal,
          async (proposal: PairingTypes.Proposal) => {
            const {uri} = proposal.signal.params

            dispatch(this.commit('SET_URI', {uri}))

            QRCodeModal.open(uri, () => {
              console.info('Modal callback')
            })
          }
        )

        client?.on(CLIENT_EVENTS.pairing.created, () => {
          if (client) {
            dispatch(
              this.commit('SET_PAIRINGS', {pairings: client.pairing.topics})
            )
          }
        })

        client?.on(CLIENT_EVENTS.session.deleted, (s: SessionTypes.Settled) => {
          const {session} = getState().auth

          console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA', s.topic)
          console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBB', session)
          if (s.topic !== session?.topic) return
          console.info('EVENT', 'session_deleted')
          dispatch(this.actions.reset())
        })
      }
    },

    checkPersistedState: (): AsyncAction => {
      return async (dispatch, getState) => {
        const {client, session} = getState().auth

        if (!client) {
          throw new Error('WalletConnect is not initialized')
        }

        // populates existing pairings to state
        dispatch(this.commit('SET_PAIRINGS', {pairings: client.pairing.topics}))

        if (!session) return

        // populates existing session to state (assume only the top one)
        if (client.session.topics.length) {
          const session = await client.session.get(client.session.topics[0])
          dispatch(this.commit('SET_SESSION', {session}))
          dispatch(
            this.commit('SET_ACCOUNTS', {accounts: session.state.accounts})
          )
        }
      }
    },

    syncGasBalance: (): AsyncAction => {
      return async (dispatch, getState) => {
        const {client, session, accounts} = getState().auth
        const [address] = accounts?.[0].split('@') ?? []

        const result = await client?.request({
          topic: session?.topic ?? '',
          chainId: Config.app.DEFAULT_CHAIN_ID,
          request: {
            method: 'getnep17balances',
            params: [address],
          },
        })

        const gas = result.balance?.find(
          (it: any) => it.assethash === Config.app.DEFAULT_GASTOKEN_SCRIPTHASH
        )

        dispatch(
          this.commit('SET_GAS_BALANCE', {
            gasBalance: (Number(gas.amount) ?? 0) / 10 ** 8,
          })
        )
      }
    },

    sendGas: (toAddress: string, amount: number): AsyncAction<string> => {
      return async (dispatch, getState) => {
        const {client, session, accounts} = getState().auth
        const [address] = accounts?.[0].split('@') ?? []

        const scriptHash = Config.app.DEFAULT_GASTOKEN_SCRIPTHASH
        const method = 'transfer'
        const from = {type: 'Address', value: address}
        const to = {
          type: 'Address',
          value: toAddress,
        }
        const value = {type: 'Integer', value: amount * 10 ** 8}
        const data = {type: 'String', value: ''}

        const result = await client?.request({
          topic: session?.topic ?? '',
          chainId: Config.app.DEFAULT_CHAIN_ID,
          request: {
            method: 'invokefunction',
            params: [scriptHash, method, [from, to, value, data]],
          },
        })

        return result as string
      }
    },

    reset: (): AsyncAction => {
      return async (dispatch) => {
        dispatch(this.commit('SET_SESSION', {session: null}))
        dispatch(this.commit('SET_URI', {uri: null}))
        dispatch(this.commit('SET_GAS_BALANCE', {uri: null}))
        dispatch(this.commit('SET_PAIRINGS', {pairings: null}))
        dispatch(this.commit('SET_ACCOUNTS', {accounts: null}))
      }
    },
  }
}
