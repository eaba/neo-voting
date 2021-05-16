import '~/styles/globals.scss'
import '@fortawesome/fontawesome-free/css/all.css'

import React from 'react'
import type {AppProps} from 'next/app'
import {ToastProvider} from 'react-toast-notifications'
import Setup from '~src/components/Setup'
import {ModalComponent} from '~src/app/modal'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      placement={'top-center'}
    >
      <Setup>
        <Component {...pageProps} />

        <ModalComponent name={'wc'} title={'Wallet Connect'} />
      </Setup>
    </ToastProvider>
  )
}

export default MyApp
