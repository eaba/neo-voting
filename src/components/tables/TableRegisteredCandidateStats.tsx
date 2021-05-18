import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {RegisteredCandidateStats} from '~src/models/RegisteredCandidateStats'
import ModalCandidate from '~src/components/modals/ModalCandidate'
import {Modal} from '~src/app/modal'

export type Props = {
  model: RegisteredCandidateStats
}

function TableRegisteredCandidateStats(props: Props) {
  async function openModal(publicKey: string | null) {
    if (publicKey) {
      Modal.open('candidate', publicKey)
    }
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
                  <td>
                    <a onClick={() => openModal(it.publicKey)}>View</a>
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
  model: PropTypes.element.isRequired,
}

export default TableRegisteredCandidateStats
