import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import {AwaitState, AwaitWrapper} from './AwaitWrapper'
import {Await as defaultAwaitInstance} from './index'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

interface Props {
  name: string
  awaitInstance?: AwaitWrapper
  onLoadingStart?: () => void
  onLoadingEnd?: () => void
  onError?: () => void
  children?: React.ReactElement | React.ReactElement[]
  defaultView?: React.ReactElement
  loadingView?: React.ReactElement
  errorView?: React.ReactElement
}

function AwaitActivity(
  props: Props &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
) {
  const ref = useRef<React.DetailedHTMLProps<any, any>>(null)
  const [state, setState] = useState<AwaitState>(AwaitState.DEFAULT)
  const [Await, setAwait] = useState<AwaitWrapper>(
    props.awaitInstance ?? defaultAwaitInstance
  )
  const [minHeight, setMinHeight] = useState<number>()
  const [minWidth, setMinWidth] = useState<number>()

  useEffect(() => {
    setAwait(props.awaitInstance ?? defaultAwaitInstance)

    const toggleEvent = (
      name?: string,
      newState: AwaitState = AwaitState.DEFAULT
    ) => {
      if (name === props.name) {
        setState(newState)

        switch (newState) {
          case AwaitState.DEFAULT:
            if (props.onLoadingEnd) props.onLoadingEnd()
            break
          case AwaitState.LOADING:
            if (props.onLoadingStart) props.onLoadingStart()
            break
          case AwaitState.ERROR:
            if (props.onError) props.onError()
            break
        }
      }
    }

    const inAction = () => {
      return Boolean(props.name && Await.inAction(props.name))
    }

    if (inAction()) {
      setState(AwaitState.LOADING)
    }

    Await.event.on('toggle', toggleEvent)

    return () => {
      // Remove current listener when this component unmount
      Await.event.off('toggle', toggleEvent)
    }
  }, [props])

  useEffect(() => {
    if (ref.current) {
      setMinHeight(ref.current.clientHeight)
      setMinWidth(ref.current.clientWidth)
    }
  }, [state])

  const activityProps: Props = {...props}
  delete activityProps.awaitInstance
  delete activityProps.onLoadingStart
  delete activityProps.onLoadingEnd
  delete activityProps.onError
  delete activityProps.children
  delete activityProps.defaultView
  delete activityProps.loadingView
  delete activityProps.errorView

  return (
    <SwitchTransition mode={'out-in'}>
      <CSSTransition
        key={state}
        timeout={400}
        classNames={'fade-blur'}
        unmountOnExit
        appear
      >
        <div ref={ref} {...activityProps}>
          {state === AwaitState.LOADING && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight,
                minWidth,
              }}
            >
              {props.loadingView ?? Await.defaultLoadingView ?? (
                <div>Loading...</div>
              )}
            </div>
          )}

          {state === AwaitState.ERROR &&
            (props.errorView ??
              props.defaultView ??
              (props.children as React.ReactElement) ?? <div />)}

          {state === AwaitState.DEFAULT &&
            (props.defaultView ?? (props.children as React.ReactElement) ?? (
              <div />
            ))}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

AwaitActivity.propTypes = {
  name: PropTypes.string.isRequired,
  awaitInstance: PropTypes.instanceOf(AwaitWrapper),
  onLoadingStart: PropTypes.func,
  onLoadingEnd: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
  defaultView: PropTypes.element,
  loadingView: PropTypes.element,
  errorView: PropTypes.element,
}

export default AwaitActivity
