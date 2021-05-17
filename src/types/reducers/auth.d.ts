import {Action} from 'redux'
import type {ReducerApplied} from '@simpli/redux-wrapper'
import type {Client} from '@walletconnect/client/dist/cjs/client'
import type {SessionTypes} from '@walletconnect/types'

export declare global {
  type AuthType =
    | 'CONNECT'
    | 'DISCONNECT'
    | 'SET_CLIENT'
    | 'SET_SESSION'
    | 'SET_GAS_BALANCE'
    | 'SET_URI'
    | 'SET_PAIRINGS'
    | 'SET_ACCOUNTS'

  interface AuthState {
    client: Client | null
    session: SessionTypes.Settled | null
    gasBalance: number | null
    uri: string | null
    pairings: string[] | null
    accounts: string[] | null
  }

  type AuthAction = AuthState & Action<AuthType>

  type AuthReducer = ReducerApplied<AuthState, AuthAction>
}
