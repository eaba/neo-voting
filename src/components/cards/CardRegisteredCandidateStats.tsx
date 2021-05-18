import React, {useEffect, useState} from 'react'
import {Await, AwaitActivity} from '~src/app/await'
import TableRegisteredCandidateStats from '~src/components/tables/TableRegisteredCandidateStats'
import {RegisteredCandidateStats} from '~src/models/RegisteredCandidateStats'

function CardRegisteredCandidateStats(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const [model, setModel] = useState<RegisteredCandidateStats>()

  async function populate() {
    const model = new RegisteredCandidateStats()

    try {
      await model.populate()
    } catch {}

    setModel(model)
  }

  useEffect(() => {
    Await.run('populateCardRegisteredCandidateStats', populate)
  }, [])

  return (
    <div {...props}>
      <div className={'card card--square'}>
        <div className={'mb-2 title'}>Registered Candidates</div>

        {model && (
          <AwaitActivity name={'populateCardRegisteredCandidateStats'}>
            <div className={'-mx-2 md:-mx-4 mb-4'}>
              <TableRegisteredCandidateStats model={model} />
            </div>
          </AwaitActivity>
        )}
      </div>
    </div>
  )
}

export default CardRegisteredCandidateStats
