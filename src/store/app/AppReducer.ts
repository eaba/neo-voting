import {ReducerWrapper} from '@simpli/redux-wrapper'
import {LanguageDispatcher} from '~src/store/app/dispatchers/LanguageDispatcher'
import {IsDarkDispatcher} from '~src/store/app/dispatchers/IsDarkDispatcher'

export class AppReducer extends ReducerWrapper<AppType, AppState, AppAction> {
  protected readonly initialState: AppState = {
    language: 'en-US',
    isDark: false,
  }

  protected readonly dispatchers = [LanguageDispatcher, IsDarkDispatcher]

  readonly getters = (state: RootState) => ({
    app: state.app,
  })

  readonly actions = {
    setLanguage: (language: string) => {
      return this.commit('SET_LANGUAGE', {language})
    },

    setDark: (isDark: boolean) => {
      return this.commit('SET_IS_DARK', {isDark})
    },

    toggleDark: (): AsyncAction => {
      return async (dispatch, getState) => {
        const isDark = getState().app.isDark

        dispatch(this.commit('SET_IS_DARK', {isDark: !isDark}))
      }
    },
  }
}
