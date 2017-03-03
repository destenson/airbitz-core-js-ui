import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { changeSignupPage } from '../Signup/Signup.action'

import { validate } from './PasswordValidation/PasswordValidation.middleware'
import { checkPassword, skipPassword } from './Password.middleware'

import SkipPassword from './Notification.web'

import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import t from '../../lib/web/LocaleStrings'
import nextButton from 'theme/nextButton.scss'
import backButton from 'theme/backButton.scss'
import skipButton from 'theme/skipButton.scss'

import { Card, CardText, CardActions } from 'react-toolbox/lib/card'

import {
  passwordNotificationShow,
  showPassword,
  hidePassword,
  changePasswordValue,
  changePasswordRepeatValue
} from './Password.action'

const unselected = require('../../img/btn_unselected.png')
const selected = require('../../img/Green-check.png')

class Password extends Component {

  _handleSubmit = (e) => {
    e.preventDefault()
    const callback = () => this.props.router.push('/review')
    this.props.dispatch(
      checkPassword(
        this.props.password,
        this.props.passwordRepeat,
        this.props.validation,
        this.props.username,
        this.props.pin,
        callback
      )
    )
  }

  _handleBack = () => {
    if (this.props.loader.loading === false) {
      return this.props.dispatch(changeSignupPage('pin'))
    }
  }

  _handlePasswordNotification = () => {
    this.refs.signupPassword.getWrappedInstance().blur()
    this.refs.passwordRepeat.getWrappedInstance().blur()
    this.props.dispatch(passwordNotificationShow())
  }
  checkOneNumber = () => this.props.validation.number ? selected : unselected
  checkCharacterLength = () => this.props.validation.characterLength ? selected : unselected
  checkOneUpper = () => this.props.validation.upperCaseChar ? selected : unselected
  checkOneLower = () => this.props.validation.lowerCaseChar ? selected : unselected
  passwordKeyPressed = (e) => {
    if (e.charCode == 13) {
      this.refs.passwordRepeat.getWrappedInstance().focus()
    }
  }
  _handleSubmitSkipPassword = () => {
    const callback = () => this.props.router.push('/signup/review')
    this.props.dispatch(
      skipPassword(
        this.props.username,
        this.props.pin,
        callback
      )
    )
  }
  _handleOnChangePassword = (password) => {
    this.props.dispatch(changePasswordValue(password))
    this.props.dispatch(validate(password))
  }

  _handleOnChangePasswordRepeat = (passwordRepeat) => {
    this.props.dispatch(changePasswordRepeatValue(passwordRepeat))
  }
  toggleRevealPassword = (e) => {
    this.refs.signupPassword.getWrappedInstance().refs.input.type = this.props.inputState ? 'text' : 'password'
    if (this.props.inputState) {
      this.props.dispatch(hidePassword())
    } else {
      this.props.dispatch(showPassword())
    }
    return false
  }

  render () {
    return (
      <div>
        <div style={{position: 'relative'}}>
          <Button onClick={this._handleBack} theme={backButton} style={{position: 'absolute', left: 0, top: 0}} type='button'>{t('string_capitalize_back')}</Button>
          <div style={{textAlign: 'center', fontSize: '16px', padding: 10}}>{t('activity_signup_password_label')}</div>
        </div>
        <Card>
          <CardText>
            <div style={{position: 'relative'}}>
              <div>
                <div style={{fontWeight: 'bold', fontSize: '16px'}}>{t('activity_signup_password_requirements')}</div>
                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '14px', margin: '0px 0px'}}><img style={{width: '20px'}} src={this.checkOneUpper()} />{ t('password_rule_no_uppercase') }</p>
                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '14px', margin: '0px 0px'}}><img style={{width: '20px'}} src={this.checkOneLower()} />{ t('password_rule_no_lowercase') }</p>
                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '14px', margin: '0px 0px'}}><img style={{width: '20px'}} src={this.checkOneNumber()} />{ t('password_rule_no_number') }</p>
                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '14px', margin: '0px 0px'}}><img style={{width: '20px'}} src={this.checkCharacterLength()} />{ t('password_rule_too_short') }</p>
              </div>
              <p>{t('fragment_setup_password_text')}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <div style={{flexGrow: 1}}><Input ref='signupPassword' autoFocus type='password' name='password' onKeyPress={this.passwordKeyPressed} onChange={this._handleOnChangePassword} value={this.props.password} label='Password' /></div>
              <img onClick={this.toggleRevealPassword} src={require('img/icon_export_view.png')} style={{width: '30px', margin: '0px 15px'}} />
            </div>
            <form onSubmit={e => this._handleSubmit(e)}>
              <Input type="password" ref='passwordRepeat' name="passwordRepeat" onChange={this._handleOnChangePasswordRepeat} value={this.props.passwordRepeat} label="Re-enter Password" />
            </form>
          </CardText>
          <CardActions>
            <Button type='button' theme={skipButton} onClick={this._handlePasswordNotification}>{t('string_skip')}</Button>
            <Button type='button' raised theme={nextButton} onClick={this._handleSubmit}>{t('string_next')}</Button>
          </CardActions>
        </Card>
        <SkipPassword handleSubmit={this._handleSubmitSkipPassword} />
      </div>

    )
  }
}

Password = withRouter(Password)
Password = connect(state => ({

  inputState: state.password.inputState,
  password: state.password.password,
  passwordRepeat: state.password.passwordRepeat,
  validation: state.password.validation,
  username: state.username,
  pin: state.pin,
  loader: state.loader

}))(Password)

export default Password
