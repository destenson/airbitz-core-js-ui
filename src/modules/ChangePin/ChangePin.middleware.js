import { pinChanged, hidePinView, showPinChangedNotification } from './ChangePin.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'
import { showContainerNotification } from '../Container.action'

export const checkPin = (password, pin, account, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    dispatch(openLoading())


    if (pin.length !== 4) {
      dispatch(closeLoading())
      return dispatch(openErrorModal(t('activity_change_pin_length')))
    }

    account.checkPassword(password).then(result => {
      if (!result) {
        dispatch(closeLoading())
        return dispatch(openErrorModal(t('server_error_bad_password')))
      }
      if (result) {
        account.changePIN(pin, error => {
          dispatch(closeLoading())
          if (error) {
            return dispatch(openErrorModal(t('server_error_no_connection')))
          }
          if (!error) {
            dispatch(pinChanged())
            dispatch(showContainerNotification(t('activity_signup_pin_change_good'), 'default'))
            return callback(null)
          }
        })
      }
    })

  }
}
