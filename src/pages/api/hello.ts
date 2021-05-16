// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'
import * as Neon from '@cityofzion/neon-js'
import {Env} from '~src/app/Env'

export interface HelloResponse {
  value: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<HelloResponse>
) => {
  const {method} = req

  switch (method) {
    case 'POST':
      try {
        const value = await invokeHelloContract()
        res.status(200).json({value})
      } catch (e) {
        res.status(500).end(e.message)
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

// https://dojo.coz.io/article/hello_world_dapp
export async function invokeHelloContract() {
  // define our invocation
  const intent = {
    scriptHash: Env.HELLO_CONTRACT_HASH,
    operation: 'hello',
    params: [],
  }

  // define how we will connect to the network
  const facade = await Neon.api.NetworkFacade.fromConfig({
    node: Env.NODE_URL,
  })

  // invoke our smart contract and decode the result
  const response = await facade.invoke(intent)
  const result = response.stack[0].value ?? ''
  return Neon.u.HexString.fromBase64(result as string).toAscii()
}
