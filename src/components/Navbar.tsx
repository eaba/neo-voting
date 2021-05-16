import React from 'react'
import {Modal} from '~src/app/modal'

function Navbar() {
  function toggleDarkMode() {
    if (localStorage.theme === 'dark') {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    } else {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <div className={'w-full typo bg'}>
      <div className={'container h-16 flex items-center'}>
        <div className={'flex-1 font-bold text-3xl'}>NEO voting</div>

        <div className={'flex'}>
          <button
            onClick={() => Modal.open('wc')}
            className={'mr-2 md:mr-8 btn'}
          >
            <i className={'mr-2 fas fa-wallet'} />
            Connect Wallet
          </button>

          <button onClick={toggleDarkMode} className={'btn btn--icon'}>
            <i className={'fas fa-adjust'} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
