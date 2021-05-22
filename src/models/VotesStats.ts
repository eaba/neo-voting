import {HttpExclude, HttpExpose, Request} from '@simpli/serialized-request'
import {Env} from '~src/app/Env'

@HttpExclude()
export class VotesStats {
  @HttpExpose('block_index')
  blockIndex: number[] = []

  @HttpExpose('vote_count')
  voteCount: number[] = []

  @HttpExpose()
  threshold: number | null = null

  async populate() {
    return await Request.get(`${Env.API_URL}/votes`)
      .name('populateVotesStats')
      .as(this)
      .fetchData()
  }
}
