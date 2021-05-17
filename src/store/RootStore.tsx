import {combineReducers} from 'redux'
import {AppReducer} from '~src/store/app/AppReducer'
import {AuthReducer} from '~src/store/auth/AuthReducer'

export type RootState = ReturnType<typeof RootStore.reducers>

export abstract class RootStore {
  static readonly app = new AppReducer()
  static readonly auth = new AuthReducer()

  static readonly reducers = combineReducers({
    app: RootStore.app.reducer,
    auth: RootStore.auth.reducer,
  })
}
