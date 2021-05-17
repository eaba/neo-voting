/**
 * @file
 * Application Configuration
 */

/**
 * App Configuration
 */
export class AppConfig {
  readonly DEFAULT_RELAY_PROVIDER = 'wss://relay.walletconnect.org'

  readonly DEFAULT_METHODS = [
    'getversion',
    'getnep17balances',
    'invokefunction',
  ]

  readonly DEFAULT_LOGGER = 'debug'

  readonly DEFAULT_APP_METADATA = {
    name: 'CoZ dApp Prototype',
    description: 'WalletConnect integration Prototype',
    url: 'https://coz.io/',
    icons: [
      'https://raw.githubusercontent.com/CityOfZion/visual-identity/develop/_CoZ%20Branding/_Logo/_Logo%20icon/_PNG%20200x178px/CoZ_Icon_DARKBLUE_200x178px.png',
    ],
  }

  readonly DEFAULT_CHAIN_ID = 'neo3:ihavenoidea'

  readonly DEFAULT_GASTOKEN_SCRIPTHASH =
    '0xd2a4cff31913016155e38e474a2c06d08be276cf'
}
