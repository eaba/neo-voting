import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStore} from '~src/store/RootStore'
import {Await, AwaitActivity} from '~src/app/await'
import TransitionShow from '~src/components/utils/TransitionShow'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

function WalletMenu() {
  const dispatch = useDispatch()

  const {auth, isConnected} = useSelector(RootStore.auth.getters)

  async function connectWallet() {
    await dispatch(RootStore.auth.actions.connect())
    Await.run('gasSync', syncGasBalance)
  }

  async function syncGasBalance() {
    await dispatch(RootStore.auth.actions.syncGasBalance())
  }

  async function disconnectWallet() {
    await dispatch(RootStore.auth.actions.disconnect())
  }

  return (
    <AwaitActivity name={'walletSync'}>
      <TransitionShow
        if={isConnected}
        elseView={
          <button
            className={'btn'}
            onClick={() => Await.run('walletSync', connectWallet)}
          >
            <i className={'fas fa-wallet'} />
            <span className={'ml-2 hidden md:inline-block'}>
              Connect Wallet
            </span>
          </button>
        }
      >
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
                {auth.gasBalance} GAS
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
      </TransitionShow>
    </AwaitActivity>
  )
}

export default WalletMenu
