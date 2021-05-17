import React from 'react'
import {CSSTransition, SwitchTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

export type Props = {
  if: boolean
  children: React.ReactElement | React.ReactElement[] | any
  elseView?: React.ReactElement | React.ReactElement[]
}

function TransitionShow(props: Props) {
  if (props.elseView) {
    return (
      <SwitchTransition mode={'out-in'}>
        <CSSTransition
          key={props.if ? 1 : 0}
          timeout={400}
          classNames={'fade-blur'}
          unmountOnExit
          appear
        >
          <>
            {(props.if ? 1 : 0) === 1 && <>{props.children}</>}
            {(props.if ? 1 : 0) === 0 && <>{props.elseView}</>}
          </>
        </CSSTransition>
      </SwitchTransition>
    )
  }

  return (
    <CSSTransition
      in={props.if}
      timeout={400}
      classNames={'fade-blur'}
      unmountOnExit
      appear
    >
      <>{props.children}</>
    </CSSTransition>
  )
}

TransitionShow.propTypes = {
  if: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element.isRequired),
    PropTypes.any,
  ]).isRequired,
  elseView: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
}

export default TransitionShow
