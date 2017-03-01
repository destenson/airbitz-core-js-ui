import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import { browserHistory } from 'react-router'

const abcuiContext = window.parent.abcuiContext.vendorName
const vendorName = abcuiContext.vendorName

class Review extends Component {
  
  render () {
      return (
        <div>
          <h3>t('activity_recovery_account_created')</h3> 
          <p>String.format(t('fragment_recovery_account_created_fragment_1'), vendorName || 'Airbitz')</p> 
          <p>String.format(t('fragment_recovery_account_created_fragment_2'), vendorName || 'Airbitz')</p> 
          <p>t('fragment_recovery_account_created_fragment_3')</p> 
        </div>
      )
  }
}

export default connect(state => ({

  details: state.reviewDetails.details,
  view: state.reviewDetails.afterQuestionPasswordRecoveryView

}))(Review)
