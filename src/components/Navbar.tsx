import React from 'react'
import {useDispatch} from 'react-redux'
import {RootStore} from '~src/store/RootStore'
import WalletMenu from '~src/components/WalletMenu'

function Navbar() {
  const dispatch = useDispatch()

  function toggleDark() {
    dispatch(RootStore.app.actions.toggleDark())
  }

  return (
    <div className={'w-full typo bg'}>
      <div className={'container h-16 flex items-center'}>
        <div className={'flex-1 font-bold text-3xl'}>NEO Voting</div>

        <div className={'flex'}>
          <div className={'mr-2 md:mr-8 flex items-center'}>
            <WalletMenu />
          </div>

          <button onClick={toggleDark} className={'btn btn--icon'}>
            <i className={'fas fa-adjust'} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
