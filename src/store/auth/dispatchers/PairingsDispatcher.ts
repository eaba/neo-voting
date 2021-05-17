import {DispatcherWrapper} from '@simpli/redux-wrapper'

export class PairingsDispatcher extends DispatcherWrapper<
  AuthType,
  AuthState,
  AuthAction
> {
  readonly type = 'SET_PAIRINGS'

  readonly reducer: AuthReducer = (state, action) => {
    const {pairings} = action

    return this.set(state, {pairings})
  }
}
