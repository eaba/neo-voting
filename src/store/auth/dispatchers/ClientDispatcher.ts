import {DispatcherWrapper} from '@simpli/redux-wrapper'

export class ClientDispatcher extends DispatcherWrapper<
  AuthType,
  AuthState,
  AuthAction
> {
  readonly type = 'SET_CLIENT'

  readonly reducer: AuthReducer = (state, action) => {
    const {client} = action

    return this.set(state, {client})
  }
}
