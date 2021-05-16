// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'
import * as Neon from '@cityofzion/neon-js'
import {Env} from '~src/app/Env'

export default async (req: NextApiRequest, res: NextApiResponse<number>) => {
  const {method} = req

  switch (method) {
    case 'GET':
      try {
        const value = await getBlockCount()
        res.status(200).json(value)
      } catch (e) {
        res.status(500).end(e.message)
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export async function getBlockCount() {
  // define how we will connect to the network
  const facade = await Neon.api.NetworkFacade.fromConfig({
    node: Env.NODE_URL,
  })

  // get the current block-height
  return await facade.getRpcNode().getBlockCount()
}
