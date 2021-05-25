import React from 'react'
import PropTypes from 'prop-types'
import {RegisteredCandidateStats} from '~src/models/RegisteredCandidateStats'
import ModalCandidate from '~src/components/modals/ModalCandidate'
import {Modal} from '~src/app/modal'
import {useDispatch, useSelector} from 'react-redux'
import {RootStore} from '~src/store/RootStore'
import {Await, AwaitActivity} from '~src/app/await'
import {useToasts} from 'react-toast-notifications'
import TransitionShow from '~src/components/utils/TransitionShow'

export type Props = {
  model: RegisteredCandidateStats
}

function TableRegisteredCandidateStats(props: Props) {
  const {isConnected} = useSelector(RootStore.auth.getters)
  const toasts = useToasts()
  const dispatch = useDispatch()

  async function openModal(publicKey: string | null) {
    if (publicKey) {
      Modal.open('candidate', publicKey)
    }
  }

  async function vote(publicKey: string | null) {
    await dispatch(RootStore.auth.actions.vote(publicKey))

    toasts.addToast(`Successfully voted to public key ${publicKey}`, {
      appearance: 'success',
    })
  }

  return (
    <>
      <div className={'custom-table'}>
        <table>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Public Key</th>
              <th scope="col">Votes</th>
              <th scope="col" />
            </tr>
          </thead>

          <tbody>
            {props.model?.candidates.map((it) => {
              return (
                <tr key={it.publicKey}>
                  <td>{it.rank}</td>
                  <td>{it.publicKey}</td>
                  <td>{it.votes}</td>
                  <td className={'flex items-center'}>
                    <a onClick={() => openModal(it.publicKey)}>View</a>

                    <TransitionShow if={isConnected}>
                      <AwaitActivity
                        name={`vote__${it.publicKey}`}
                        className={'w-16 ml-8'}
                      >
                        <button
                          className={'btn'}
                          onClick={() =>
                            Await.run(`vote__${it.publicKey}`, () =>
                              vote(it.publicKey)
                            )
                          }
                        >
                          Vote
                        </button>
                      </AwaitActivity>
                    </TransitionShow>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <ModalCandidate />
    </>
  )
}

TableRegisteredCandidateStats.propTypes = {
  model: PropTypes.object.isRequired,
}

export default TableRegisteredCandidateStats
