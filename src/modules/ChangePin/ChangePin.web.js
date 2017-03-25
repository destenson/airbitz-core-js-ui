import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'
import Snackbar from 'react-toolbox/lib/snackbar'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'

import { hidePinView, showPinView, changePinPasswordValue, changePinValue, hidePinChangedNotification, showPinChangedNotification } from './ChangePin.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'
import { checkPin } from './ChangePin.middleware'

import neutralButtons from 'theme/neutralButtons.scss'
import primaryButtons from 'theme/primaryButtons.scss'

class ChangePin extends Component {

  _handleSubmit = () => {
    const callback = (error) => {
      if(!error){
        this.props.dispatch(hidePinView())
      }
    }
    this.props.dispatch(
      checkPin(
        this.props.password,
        this.props.pin,
        this.props.user,
        callback
      )
    )
  }

  _handleOnChangePinPassword = (password) => {
    this.props.dispatch(changePinPasswordValue(password))
  }

  _handleOnChangePin = (pin) => {
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }

    pin = pin.replace(/\D/g,'')

    this.props.dispatch(changePinValue(pin))
  }

  _handleHideModal = () => {
    this.props.dispatch(hidePinView())
  }

  buttons = [
    { label: "Submit", onClick: this._handleSubmit, theme: primaryButtons, raised: true, primary: true },
    { label: "Close", onClick: this._handleHideModal, theme: neutralButtons }
  ]

  render () {
    const { view, pin, password } = this.props
    return (
      <div>
        <Dialog
          actions={this.buttons}
          active={this.props.view}
          onEscKeyDown={this._handleHideModal}
          onOverlayClick={this._handleHideModal}
          title={t('activity_signup_title_change_pin_4_digit')}
        >
          <Input type='password' name='changePinPassword' onChange={this._handleOnChangePinPassword} value={password} label='Current Password' />
          <Input type='password' name='changePin' onChange={this._handleOnChangePin} value={pin} maxLength={4} label='New Pin' />
        </Dialog>
      </div>
    )
  }
}

export default connect(state => ({

  view                    : state.changePin.view,
  password                : state.changePin.password,
  pin                     : state.changePin.pin,
  user                    : state.user

}))(ChangePin)
