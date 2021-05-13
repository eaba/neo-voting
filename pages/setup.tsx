import React from 'react'
import {RequestConfig} from '@simpli/serialized-request'
import {useToasts} from 'react-toast-notifications'
import {HttpConfig} from '~/config/HttpConfig'

type Prop = {
  children: React.ReactChild
}

function Setup({children}: Prop) {
  const toastHooker = useToasts()

  const http = new HttpConfig(toastHooker)

  RequestConfig.axios = http.axiosInstance

  return <>{children}</>
}

export default Setup
