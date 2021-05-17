import PropTypes from 'prop-types'
import React, {MouseEvent, useEffect, useRef, useState} from 'react'
import {CSSTransition} from 'react-transition-group'
import {ModalWrapper} from './ModalWrapper'
import {Modal as defaultModalInstance} from './index'

interface Props {
  name: string
  title?: string
  canClose?: boolean
  canCloseOutside?: boolean
  modalInstance?: ModalWrapper
  onOpen?: (payload?: any) => void
  onClose?: () => void
  children?: React.ReactElement | React.ReactElement[] | string
}

function ModalComponent(
  props: Props &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
) {
  const ref = useRef<React.DetailedHTMLProps<any, any>>(null)
  const [isOpen, setOpen] = useState<boolean>(false)
  const [bodyOverflowY, setBodyOverflowY] = useState<string>()
  const [Modal, setModal] = useState<ModalWrapper>(
    props.modalInstance ?? defaultModalInstance
  )

  function open(payload?: any) {
    setOpen(true)
    document.body.style.overflowY = 'hidden'
    props.onOpen?.(payload)
  }

  function close(force = false) {
    if ((props.canClose ?? true) || force) {
      setOpen(false)
      document.body.style.overflowY = bodyOverflowY ?? 'unset'
      props.onClose?.()
    }
  }

  function closeFromView(e: MouseEvent<HTMLDivElement>) {
    if ((props.canCloseOutside ?? true) && e.target === ref.current) {
      close()
    }
  }

  useEffect(() => {
    setModal(props.modalInstance ?? defaultModalInstance)
    setBodyOverflowY(document.body.style.overflowY)

    const openEvent = (name: string, payload?: any) => {
      if (name === props.name) {
        open(payload)
      }
    }

    const closeEvent = (name: string) => {
      if (name === props.name) {
        close(true)
      }
    }

    const closeAllEvent = () => {
      setOpen(false)
      props.onClose?.()
    }

    Modal.event.on('open', openEvent)
    Modal.event.on('close', closeEvent)
    Modal.event.on('closeAll', closeAllEvent)

    return () => {
      // Remove current listener when this component unmount
      Modal.event.off('open', openEvent)
      Modal.event.off('close', closeEvent)
      Modal.event.off('closeAll', closeAllEvent)
    }
  }, [props])

  return (
    <div className={'modal'}>
      <CSSTransition
        in={isOpen}
        timeout={400}
        classNames={'fade-blur'}
        unmountOnExit
        appear
      >
        <div className={'modal__scroll'}>
          <div ref={ref} className={'modal__view'} onClick={closeFromView}>
            <div className={'modal__frame'}>
              <div className={'modal__header'}>
                <div className={'modal__title'}>{props.title}</div>

                {(props.canClose ?? true) && (
                  <a className={'modal__close-icon'} onClick={() => close()} />
                )}
              </div>

              <div className={'modal__body'}>
                {(props.children as React.ReactElement) ?? <div />}
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={isOpen}
        timeout={400}
        classNames={'fade'}
        unmountOnExit
        appear
      >
        <div className={'modal__bg'} />
      </CSSTransition>
    </div>
  )
}

ModalComponent.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  canClose: PropTypes.bool,
  canCloseOutside: PropTypes.bool,
  modalInstance: PropTypes.instanceOf(ModalWrapper),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
}

export default ModalComponent
