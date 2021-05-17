import {Action} from 'redux'
import type {ReducerApplied} from '@simpli/redux-wrapper'

export declare global {
  type AppType = 'SET_LANGUAGE' | 'SET_IS_DARK'

  interface AppState {
    language: string
    isDark: boolean
  }

  type AppAction = AppState & Action<AppType>

  type AppReducer = ReducerApplied<AppState, AppAction>
}
