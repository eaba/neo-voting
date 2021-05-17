import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CSSTransition, SwitchTransition} from 'react-transition-group'
import {RootStore} from '~src/store/RootStore'
import {Await, AwaitActivity} from '~src/app/await'

function WalletMenu() {
  const dispatch = useDispatch()
  const dispatchAsyncNumber = useDispatch<AsyncDispatch<number>>()
  const [balance, setBalance] = useState(0)

  const isConnected = useSelector((state: RootState) =>
    Boolean(state.auth.session)
  )

  const auth = useSelector((state: RootState) => state.auth)

  async function connectWallet() {
    await dispatch(RootStore.auth.actions.connect())
    Await.run('gasSync', populateGasBalance)
  }

  async function populateGasBalance() {
    const balance = await dispatchAsyncNumber(
      RootStore.auth.actions.getGasBalance()
    )
    setBalance(balance)
  }

  async function disconnectWallet() {
    await dispatch(RootStore.auth.actions.disconnect())
  }

  return (
    <SwitchTransition mode={'out-in'}>
      <CSSTransition
        key={isConnected ? 1 : 0}
        timeout={400}
        classNames={'fade-blur'}
        unmountOnExit
        appear
      >
        <AwaitActivity name={'walletSync'}>
          <>
            {!isConnected && (
              <button
                className={'btn'}
                onClick={() => Await.run('walletSync', connectWallet)}
              >
                <i className={'fas fa-wallet'} />
                <span className={'ml-2 hidden md:inline-block'}>
                  Connect Wallet
                </span>
              </button>
            )}

            {isConnected && (
              <div className={'flex items-center'}>
                <div
                  className={
                    'mr-4 hidden md:flex flex-col items-end truncate text-xs'
                  }
                >
                  <div>{auth.accounts?.[0]}</div>

                  <AwaitActivity name={'gasSync'}>
                    <span
                      className={
                        'transition font-bold text-pal-darker dark:text-pal-primary'
                      }
                    >
                      {balance} GAS
                    </span>
                  </AwaitActivity>
                </div>

                <button
                  className={'btn btn--danger'}
                  onClick={() => Await.run('walletSync', disconnectWallet)}
                >
                  <i className={'fas fa-power-off'} />
                  <span className={'ml-2 hidden md:inline-block'}>
                    Disconnect Wallet
                  </span>
                </button>
              </div>
            )}
          </>
        </AwaitActivity>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default WalletMenu
