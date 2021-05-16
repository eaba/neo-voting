/**
 * @file
 * Http Request Configuration
 * Used in library: axios
 *
 * This file provides the standard configuration to communicate with the server
 * See https://github.com/axios/axios
 */

import axios, {AxiosError} from 'axios'
import qs from 'qs'
import type {
  AddToast,
  AppearanceTypes,
  RemoveAllToasts,
  RemoveToast,
  UpdateToast,
} from 'react-toast-notifications'
import type {ReactNode} from 'react'

/**
 * HTTP Configuration
 */
export class HttpConfig {
  /**
   * Web Server request & response config
   */
  readonly axiosInstance = axios.create({
    paramsSerializer: (params) => qs.stringify(params, {arrayFormat: 'repeat'}), // myendpoint?myarray=1&myarray=2
  })

  constructor(toastHooker: ToastHooker) {
    /**
     * Interceptor for every HTTP response of this app
     */
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const response = error.response

        /**
         * You may specify which code errors will ignore separated by comma
         * e.g. 400,404,500
         * Or ignore all errors by setting '*'
         */
        const ignoreErrors = error.config?.headers?.['X-Ignore-Errors']
          ? String(error.config?.headers?.['X-Ignore-Errors'])
          : null

        const ignoreCodeErrors =
          ignoreErrors
            ?.split(',')
            ?.map((it) => Number(it))
            ?.filter((it) => it) ?? []

        const conditionsToIgnoreErrors = [
          ignoreCodeErrors.includes(response?.status ?? 0),
          ignoreErrors === '*',
        ]

        if (conditionsToIgnoreErrors.some((it) => it)) {
          return Promise.reject(response?.data ?? response?.statusText ?? '')
        }

        if (!response) {
          return console.error('Could not connect to server')
        }

        if (response.status >= 400) {
          toastHooker.addToast(
            `${response.status.toString()} - ${
              response.data ?? response.statusText
            }`,
            {appearance: 'error'}
          )
          console.error(
            response.data ?? response.statusText,
            response.status.toString()
          )
          return Promise.reject(error)
        }

        return Promise.reject(error)
      }
    )
  }
}

export interface ToastHooker {
  addToast: AddToast
  removeToast: RemoveToast
  removeAllToasts: RemoveAllToasts
  toastStack: Array<{
    content: ReactNode
    id: string
    appearance: AppearanceTypes
  }>
  updateToast: UpdateToast
}
