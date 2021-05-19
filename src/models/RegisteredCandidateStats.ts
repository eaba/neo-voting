import {
  HttpExclude,
  HttpExpose,
  Request,
  ResponseSerialize,
} from '@simpli/serialized-request'
import {Candidate} from './Candidate'
import {Env} from '~src/app/Env'

@HttpExclude()
export class RegisteredCandidateStats {
  @HttpExpose('block_index')
  blockIndex: number[] = []

  @HttpExpose('candidate_count')
  candidateCount: number[] = []

  @HttpExpose()
  @ResponseSerialize(Candidate)
  candidates: Candidate[] = []

  async populate() {
    return await Request.get(`${Env.API_URL}/registered_candidates`)
      .name('populateRegisteredCandidateStats')
      .as(this)
      .fetchData()
  }
}
