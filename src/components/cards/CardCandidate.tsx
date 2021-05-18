import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Await, AwaitActivity} from '~src/app/await'
import {RootStore} from '~src/store/RootStore'
import {Candidate} from '~src/models/Candidate'
import TableCandidate from '~src/components/tables/TableCandidate'

function CardCandidate(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const {publicKey} = useSelector(RootStore.auth.getters)
  const [model, setModel] = useState<Candidate>()

  async function populate() {
    if (publicKey) {
      const candidate = new Candidate(publicKey)

      try {
        await candidate.populate()
      } catch {}

      setModel(candidate)
    }
  }

  useEffect(() => {
    Await.run('populateCardCandidate', populate)
  }, [publicKey])

  return (
    <div {...props}>
      <div className={'card'}>
        <div className={'mb-4 title'}>Wallet Info</div>

        {model && (
          <AwaitActivity name={'populateCardCandidate'}>
            <div className={'-mx-2 md:-mx-4 mb-4'}>
              <TableCandidate model={model} />
            </div>
          </AwaitActivity>
        )}
      </div>
    </div>
  )
}

export default CardCandidate
