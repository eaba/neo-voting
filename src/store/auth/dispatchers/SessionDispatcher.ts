import {DispatcherWrapper} from '@simpli/redux-wrapper'

export class SessionDispatcher extends DispatcherWrapper<
  AuthType,
  AuthState,
  AuthAction
> {
  readonly type = 'SET_SESSION'

  readonly reducer: AuthReducer = (state, action) => {
    const {session} = action

    return this.set(state, {session})
  }
}
