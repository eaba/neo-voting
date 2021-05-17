import {AppConfig} from '~src/config/AppConfig'
import {HttpConfig, ToastHooker} from '~src/config/HttpConfig'

export abstract class Config {
  static app = new AppConfig()
  static http = (toastHooker: ToastHooker) => new HttpConfig(toastHooker)
}
