import React, {useEffect, useState} from 'react'
import {Await, AwaitActivity} from '~src/app/await'
import {Candidate} from '~src/models/Candidate'
import {ModalComponent} from '~src/app/modal'
import TableCandidate from '~src/components/tables/TableCandidate'

function ModalCandidate() {
  const [publicKey, setPublicKey] = useState<string>()
  const [candidate, setCandidate] = useState<Candidate>()

  function openEvent(publicKey: string) {
    setPublicKey(publicKey)
  }

  function closeEvent() {
    setPublicKey(undefined)
  }

  async function populate() {
    const candidate = new Candidate(publicKey)

    try {
      await candidate.populate()
    } catch {}

    setCandidate(candidate)
  }

  useEffect(() => {
    if (publicKey) {
      Await.run(`populateCandidate__${publicKey}`, populate)
    }
  }, [publicKey])

  return (
    <ModalComponent
      name={'candidate'}
      title={'Candidate Info'}
      innerClass={'large'}
      onOpen={openEvent}
      onClose={closeEvent}
    >
      {candidate && (
        <AwaitActivity name={`populateCandidate__${publicKey}`}>
          <div className={'-mx-2 md:-mx-2 mb-4'}>
            <TableCandidate model={candidate} />
          </div>
        </AwaitActivity>
      )}
    </ModalComponent>
  )
}

export default ModalCandidate
