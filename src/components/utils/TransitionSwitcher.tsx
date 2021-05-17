import React from 'react'
import {CSSTransition, SwitchTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

export type Props = {
  state: string | number
  children: React.ReactElement | React.ReactElement[] | any
}

function TransitionSwitcher(props: Props) {
  return (
    <SwitchTransition mode={'out-in'}>
      <CSSTransition
        key={props.state}
        timeout={400}
        classNames={'fade-blur'}
        unmountOnExit
        appear
      >
        <>{props.children}</>
      </CSSTransition>
    </SwitchTransition>
  )
}

TransitionSwitcher.propTypes = {
  state: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element.isRequired),
    PropTypes.any,
  ]).isRequired,
}

export default TransitionSwitcher
