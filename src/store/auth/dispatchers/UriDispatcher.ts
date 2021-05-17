import {DispatcherWrapper} from '@simpli/redux-wrapper'

export class UriDispatcher extends DispatcherWrapper<
  AuthType,
  AuthState,
  AuthAction
> {
  readonly type = 'SET_URI'

  readonly reducer: AuthReducer = (state, action) => {
    const {uri} = action

    return this.set(state, {uri})
  }
}
