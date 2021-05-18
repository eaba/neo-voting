import {
  HttpExclude,
  HttpExpose,
  Request,
  ResponseSerialize,
} from '@simpli/serialized-request'
import {Candidate} from './Candidate'

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
    return await Request.get(`http://127.0.0.1:5000/registered_candidates`)
      .name('populateRegisteredCandidateStats')
      .as(this)
      .fetchData()
  }
}
