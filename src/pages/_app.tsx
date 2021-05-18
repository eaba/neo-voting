import '~/styles/globals.scss'
import '@fortawesome/fontawesome-free/css/all.css'

import 'reflect-metadata'

import React from 'react'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {CircleLoader} from 'react-spinners/index'
import {ToastProvider} from 'react-toast-notifications'
import Setup from '~src/components/Setup'
import {AwaitActivity} from '~src/app/await'
import {RootStore} from '~src/store/RootStore'
import {Env} from '~src/app/Env'

import type {AppProps} from 'next/app'

const store = createStore(RootStore.reducers, {}, applyMiddleware(thunk))

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement={'top-center'}
      >
        <Setup>
          <AwaitActivity
            name={'screen'}
            loadingView={<CircleLoader color={Env.PALETTE_PRIMARY} />}
          >
            <Component {...pageProps} />
          </AwaitActivity>
        </Setup>
      </ToastProvider>
    </Provider>
  )
}

export default MyApp
