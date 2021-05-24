import React from 'react'
import PropTypes from 'prop-types'
import {Candidate} from '~src/models/Candidate'

export type Props = {
  model: Candidate
}

function TableCandidate(props: Props) {
  return (
    <div className={'custom-table'}>
      <table>
        <thead>
          <tr>
            <td />
            <td />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Public Key</td>
            <td>
              <span className={'text-xs'}>{props.model?.publicKey}</span>
            </td>
          </tr>
          <tr>
            <td>Registration Date</td>
            <td>{props.model?.registrationDate}</td>
          </tr>
          <tr>
            <td>Total Votes</td>
            <td>{props.model?.votes}</td>
          </tr>
          <tr>
            <td>Unique Voters</td>
            <td>{props.model?.uniqueVoters}</td>
          </tr>
          <tr>
            <td>In Committee</td>
            <td>{props.model?.inCommittee ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Position</td>
            <td>
              {props.model?.position} / {props.model?.totalCandidates}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

TableCandidate.propTypes = {
  model: PropTypes.element.isRequired,
}

export default TableCandidate
