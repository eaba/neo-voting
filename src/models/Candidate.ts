import {HttpExclude, HttpExpose, Request} from '@simpli/serialized-request'

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
    await Request.get(`http://127.0.0.1:5000/candidate/${this.publicKey}`)
      .name('populateCandidate')
      .as(this)
      .fetchData()
  }

  static async getCommittees() {
    await Request.get(`http://127.0.0.1:5000/committee`)
      .name('getCommittees')
      .asArrayOf<Committee>()
      .fetchData()
  }
}
