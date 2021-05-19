import {HttpExclude, HttpExpose, Request} from '@simpli/serialized-request'
import {Env} from '~src/app/Env'

export interface CommitteeResponse {
  committee: Committee[]
}

export interface Committee {
  [hash: string]: number
}

@HttpExclude()
export class Candidate {
  constructor(publicKey?: string | null) {
    this.publicKey = publicKey ?? null
  }

  @HttpExpose('public_key')
  publicKey: string | null = null

  @HttpExpose('registration_date')
  registrationDate: string | null = null

  @HttpExpose()
  rank: number | null = null

  @HttpExpose()
  votes: number | null = null

  @HttpExpose('unique_voters')
  uniqueVoters: number | null = null

  @HttpExpose('in_committee')
  inCommittee: boolean | null = null

  @HttpExpose()
  position: number | null = null

  @HttpExpose('total_candidates')
  totalCandidates: number | null = null

  async populate() {
    return await Request.get(`${Env.API_URL}/candidate/${this.publicKey}`)
      .name('populateCandidate')
      .as(this)
      .fetchData()
  }

  static async getCommittees() {
    return await Request.get(`${Env.API_URL}/committee`)
      .name('getCommittees')
      .as<CommitteeResponse>()
      .fetchData()
  }
}
