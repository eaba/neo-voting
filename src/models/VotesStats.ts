import {HttpExclude, HttpExpose, Request} from '@simpli/serialized-request'

@HttpExclude()
export class VotesStats {
  @HttpExpose('block_index')
  blockIndex: number[] = []

  @HttpExpose('vote_count')
  voteCount: number[] = []

  @HttpExpose()
  treshhold: number | null = null

  async populate() {
    return await Request.get(`http://127.0.0.1:5000/votes`)
      .name('populateVotesStats')
      .as(this)
      .fetchData()
  }
}
