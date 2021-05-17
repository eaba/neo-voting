import {DispatcherWrapper} from '@simpli/redux-wrapper'

export class GasBalanceDispatcher extends DispatcherWrapper<
  AuthType,
  AuthState,
  AuthAction
> {
  readonly type = 'SET_GAS_BALANCE'

  readonly reducer: AuthReducer = (state, action) => {
    const {gasBalance} = action

    return this.set(state, {gasBalance})
  }
}
