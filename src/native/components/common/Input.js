import React, { Component, PropTypes } from 'react'
import { TextInput } from 'react-native'

class Input extends Component {
  componentWillMount () {
    this.setState({
      inputText: '',
      autoFocus: this.props.autoFocus
    })
  }
  componentDidMount () {
    if (this.props.autoFocus) {
      // set the focus to the thing
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.inputText) {
      this.setState({
        inputText: nextProps.value,
        autoFocus: nextProps.autoFocus
      })
    }
    if (nextProps.autoFocus && !this.props.autoFocus) {
      console.log('SENDING THE FOCUS WTF> ')
      console.log('SENDING THE FOCUS WTF> ')
      console.log('SENDING THE FOCUS WTF> ')
      console.log('SENDING THE FOCUS WTF> ')
      this.textInput.focus()
    }
  }

  render () {
    return (
      <TextInput
        ref={this.addRef.bind(this)}
        secureTextEntry={this.props.secureTextEntry}
        placeholder={this.props.placeholder}
        autoCorrect={this.props.autoCorrect}
        autoCapitalize={this.props.autoCapitalize}
        value={this.state.inputText}
        style={this.props.style}
        onChangeText={this.onChange.bind(this)}
        autoFocus={this.state.autoFocus}
        returnKeyType={this.props.returnKeyType}
        onSubmitEditing={this.onSubmitEdit.bind(this)}
      />
    )
  }
  addRef (arg) {
    if (arg) {
      this.textInput = arg
    }
  }

  onSubmitEdit (event) {
    if (this.props.onFinish) {
      this.props.onFinish()
    }
  }
  onChange (text) {
    this.setState({
      inputText: text
    })
    this.props.onChangeText(text)
  }
}

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  isError: PropTypes.bool,
  onFinish: PropTypes.func,
  returnKeyType: PropTypes.string
}

Input.defaultProps = {
  autoCapitalize: 'none',
  autoCorrect: false,
  autoFocus: false,
  returnKeyType: 'default'
}

export { Input }