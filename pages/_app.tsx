import '~/styles/globals.scss'

import type {AppProps} from 'next/app'
import React from 'react'
import {ToastProvider} from 'react-toast-notifications'
import Setup from '~/pages/setup'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      placement={'top-center'}
    >
      <Setup>
        <Component {...pageProps} />
      </Setup>
    </ToastProvider>
  )
}

export default MyApp
