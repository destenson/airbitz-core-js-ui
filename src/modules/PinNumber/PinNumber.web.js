import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import t from '../../lib/web/LocaleStrings'
import nextButton from 'theme/nextButton.scss'
import backButton from 'theme/backButton.scss'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card'

import { changeSignupPage } from '../Signup/Signup.action'
import { changePinNumberValue } from './PinNumber.action'
import { checkPIN } from './PinNumber.middleware'

class PinComponent extends Component {

  _handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(
     checkPIN(
        this.props.pin,
        () => this.props.dispatch(
          changeSignupPage('password')
        )
      )
    )
  }

  _handleBack = () => {
    this.props.dispatch(
      changeSignupPage('username')
    )
  }

  _handleOnChangeText = (value) => {
    if (value.length > 4) {
      value = value.substr(0, 4)
    }
    this.props.dispatch(
      changePinNumberValue(value)
    )
  }

  pinStyle = () => {
    if (this.props.pin.length > 0) {
      return {textAlign: 'center', fontSize: '70px', height: '80px'}
    }else{
      return {textAlign: 'center', fontSize: '35px', height: '80px'}
    }
  }

  render () {
    return (
      <div>
        <div style={{position: 'relative'}}>
          <Button onClick={this._handleBack} theme={backButton} style={{position: 'absolute', left: 0, top: 0}} type='button'>{t('string_capitalize_back')}</Button>
          <div style={{textAlign: 'center', fontSize: '16px', padding: '10px'}}>{t('activity_signup_pin_label')}</div>
        </div>
            <form onSubmit={e => this._handleSubmit(e)}>
              <Input
                ref='signupPin'
                type="password"
                style={this.pinStyle()}
                autoFocus
                name="pin"
                onChange={this._handleOnChangeText}
                value={this.props.pin}
                placeholder={t('activity_signup_pin_hint')}
              />
            </form>
            <p style={{whiteSpace: 'pre-line'}}>{t('fragment_setup_pin_text')}</p>
            <Button type="button" raised theme={nextButton} onClick={this._handleSubmit}>{t('string_next')}</Button>
      </div>
    )
  }
}

export default connect(state => ({

  pin: state.pin

}))(PinComponent)
