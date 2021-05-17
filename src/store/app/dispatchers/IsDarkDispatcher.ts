import {DispatcherWrapper} from '@simpli/redux-wrapper'

export class IsDarkDispatcher extends DispatcherWrapper<
  AppType,
  AppState,
  AppAction
> {
  readonly type = 'SET_IS_DARK'

  readonly reducer: AppReducer = (state, action) => {
    const {isDark} = action

    if (isDark) {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }

    return this.set(state, {isDark})
  }
}
