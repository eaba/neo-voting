export abstract class Env {
  static readonly NODE_URL: string = process.env.NEXT_PUBLIC_NODE_URL ?? ''

  static readonly HELLO_CONTRACT_HASH: string =
    process.env.NEXT_PUBLIC_HELLO_CONTRACT_HASH ?? ''
}
