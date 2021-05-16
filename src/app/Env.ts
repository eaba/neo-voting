export abstract class Env {
  static readonly NODE_URL = process.env.NEXT_PUBLIC_NODE_URL ?? ''

  static readonly HELLO_CONTRACT_HASH =
    process.env.NEXT_PUBLIC_HELLO_CONTRACT_HASH ?? ''

  static readonly PALETTE_BLACK = process.env.NEXT_PUBLIC_PALETTE_BLACK ?? ''

  static readonly PALETTE_WHITE = process.env.NEXT_PUBLIC_PALETTE_WHITE ?? ''

  static readonly PALETTE_DARKEST =
    process.env.NEXT_PUBLIC_PALETTE_DARKEST ?? ''

  static readonly PALETTE_DARKER = process.env.NEXT_PUBLIC_PALETTE_DARKER ?? ''

  static readonly PALETTE_PRIMARY =
    process.env.NEXT_PUBLIC_PALETTE_PRIMARY ?? ''

  static readonly PALETTE_LIGHTER =
    process.env.NEXT_PUBLIC_PALETTE_LIGHTER ?? ''

  static readonly PALETTE_LIGHTEST =
    process.env.NEXT_PUBLIC_PALETTE_LIGHTEST ?? ''
}
