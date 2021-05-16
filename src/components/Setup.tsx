import React, {useEffect} from 'react'
import {useToasts} from 'react-toast-notifications'
import BarLoader from 'react-spinners/BarLoader'
import {RequestConfig, RequestListener} from '@simpli/serialized-request'
import {HttpConfig} from '~src/config/HttpConfig'
import {Await} from '~src/app/await'
import {Env} from '~src/app/Env'

export type Props = {
  children?: React.ReactElement | React.ReactElement[]
}

function Setup(props: Props) {
  const toastHooker = useToasts()

  const http = new HttpConfig(toastHooker)

  RequestConfig.axios = http.axiosInstance
  RequestListener.onRequestStart((name) => Await.init(name))
  RequestListener.onRequestEnd((name) => Await.done(name))
  RequestListener.onRequestError((name) => Await.error(name))

  Await.defaultLoadingView = <BarLoader color={Env.PALETTE_PRIMARY} />

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return <>{props.children}</>
}

export default Setup
