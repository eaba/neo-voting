import {DispatcherWrapper} from '@simpli/redux-wrapper'

export class AccountsDispatcher extends DispatcherWrapper<
  AuthType,
  AuthState,
  AuthAction
> {
  readonly type = 'SET_ACCOUNTS'

  readonly reducer: AuthReducer = (state, action) => {
    const {accounts} = action

    return this.set(state, {accounts})
  }
}
