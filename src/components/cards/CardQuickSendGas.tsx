import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useToasts} from 'react-toast-notifications'
import {RootStore} from '~src/store/RootStore'
import {Await, AwaitActivity} from '~src/app/await'
import {Helper} from '~src/app/Helper'
import TransitionSwitcher from '~src/components/utils/TransitionSwitcher'
import TransitionShow from '~src/components/utils/TransitionShow'

export enum State {
  FORM,
  SENT,
}

function CardQuickSendGas(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const dispatch = useDispatch()
  const dispatchAsyncString = useDispatch<AsyncDispatch<string>>()

  const toasts = useToasts()

  const [state, setState] = useState<State>(State.FORM)
  const [address, setAddress] = useState<string>()
  const [gasAmount, setGasAmount] = useState<number>()
  const [txid, setTxid] = useState<string>()

  function resetState() {
    setState(State.FORM)
    setAddress(undefined)
    setGasAmount(undefined)
    setTxid(undefined)
  }

  async function sendGas() {
    const txid = await dispatchAsyncString(
      RootStore.auth.actions.sendGas(address ?? '', gasAmount ?? 0)
    )

    setAddress(undefined)
    setGasAmount(undefined)

    await Helper.sleep(15000)

    setState(State.SENT)
    setTxid(txid)

    Await.run('gasSync', async () =>
      dispatch(RootStore.auth.actions.syncGasBalance())
    )

    toasts.addToast(
      `Successfully sent ${gasAmount} GAS to address ${address}`,
      {appearance: 'success'}
    )
  }

  return (
    <div {...props}>
      <div className={'card'}>
        <div className={'mb-4 title'}>Quick send GAS</div>

        <TransitionSwitcher state={state}>
          <AwaitActivity name={'sendGas'}>
            <>
              {state === State.FORM && (
                <>
                  <div className={'mb-2'}>
                    <input
                      type="text"
                      className={'input w-full'}
                      placeholder={'Address'}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className={'flex'}>
                    <input
                      type="number"
                      className={'mr-2 input flex-1'}
                      placeholder={'GAS'}
                      value={gasAmount}
                      onChange={(e) => setGasAmount(Number(e.target.value))}
                    />

                    <div className={'w-28'}>
                      <TransitionShow if={!!(address && (gasAmount ?? 0) > 0)}>
                        <button
                          onClick={() => Await.run('sendGas', sendGas)}
                          className={'btn w-full h-full'}
                        >
                          Send GAS
                        </button>
                      </TransitionShow>
                    </div>
                  </div>
                </>
              )}

              {state === State.SENT && (
                <div className={'w-full'}>
                  <div>GAS sent</div>

                  <div className={'mb-4'}>
                    <div className={'mb-2'}>Transaction ID:</div>

                    <div
                      className={
                        'overflow-x-auto rounded px-2 py-6 shadow-inner text-xs text-pal-black dark:text-pal-white bg-pal-white dark:bg-pal-darkest'
                      }
                    >
                      {txid}
                    </div>
                  </div>

                  <button onClick={resetState} className={'btn'}>
                    Back
                  </button>
                </div>
              )}
            </>
          </AwaitActivity>
        </TransitionSwitcher>
      </div>
    </div>
  )
}

export default CardQuickSendGas
