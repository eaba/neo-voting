import {DispatcherWrapper} from '@simpli/redux-wrapper'

export class LanguageDispatcher extends DispatcherWrapper<
  AppType,
  AppState,
  AppAction
> {
  readonly type = 'SET_LANGUAGE'

  readonly reducer: AppReducer = (state, action) => {
    const {language} = action

    return this.set(state, {language})
  }
}
