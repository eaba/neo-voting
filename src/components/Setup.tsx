import React, {useEffect} from 'react'
import {useToasts} from 'react-toast-notifications'
import BarLoader from 'react-spinners/BarLoader'
import {RequestConfig, RequestListener} from '@simpli/serialized-request'
import {Await} from '~src/app/await'
import {Env} from '~src/app/Env'
import {Config} from '~src/app/Config'
import {useDispatch} from 'react-redux'
import {RootStore} from '~src/store/RootStore'

export type Props = {
  children?: React.ReactElement | React.ReactElement[]
}

function Setup(props: Props) {
  const toastHooker = useToasts()
  const dispatch = useDispatch()

  RequestConfig.axios = Config.http(toastHooker).axiosInstance
  RequestListener.onRequestStart((name) => Await.init(name))
  RequestListener.onRequestEnd((name) => Await.done(name))
  RequestListener.onRequestError((name) => Await.error(name))

  Await.defaultLoadingView = <BarLoader color={Env.PALETTE_PRIMARY} />

  async function init() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      dispatch(RootStore.app.actions.setDark(true))
    } else {
      dispatch(RootStore.app.actions.setDark(false))
    }

    await dispatch(RootStore.auth.actions.init())
  }

  useEffect(() => {
    Await.run('screen', init)
  }, [])

  return <>{props.children}</>
}

export default Setup
