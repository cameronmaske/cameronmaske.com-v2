import React from 'react'
import { rhythm } from '../utils/typography'
import style from './signup.module.css'
import { AlertCircle } from 'react-feather'
import jsonp from 'jsonp'
import toQueryString from 'to-querystring'

const url =
  'https://charteredjobs.us18.list-manage.com/subscribe/post?u=1f3944b5f86802f0a0d278ad0&amp;id=60d9c8d709'

// Most of this is shamelessly taken from https://github.com/revolunet/react-mailchimp-subscribe/blob/master/src/index.js
const getAjaxUrl = url => url.replace('/post?', '/post-json?')

class SignUpReminder extends React.Component {
  constructor(props) {
    super(props)
    this.emailInput = React.createRef()
    let success = false
    if (typeof window !== 'undefined') {
      const signedUp = localStorage.getItem('signedUp')
      if (JSON.parse(signedUp)) {
        success = true
      }
    }
    this.state = {
      email: '',
      valid: false,
      message: null,
      success: success,
    }
  }
  onBlur = event => {
    this.setState({
      valid: this.state.email.indexOf('@') > -1,
    })
  }

  onChange = event => {
    this.setState({
      email: event.target.value,
      valid: event.target.value.indexOf('@') > -1,
    })
  }
  submitToMailChimp = () => {
    const data = {
      EMAIL: this.state.email,
    }
    const params = toQueryString(data)
    this.setState({
      loading: true,
    })
    return jsonp(
      getAjaxUrl(url) + '&' + params,
      {
        param: 'c',
      },
      (err, data) => {
        console.log(err, data)
        if (err) {
          this.setState({
            status: 'error',
            success: false,
            loading: false,
            message: err,
          })
        } else if (data.result !== 'success') {
          console.log('error')
          this.setState({
            status: 'error',
            success: false,
            loading: false,
            message: data.msg,
          })
        } else {
          console.log('success')
          this.setState({
            status: 'success',
            success: true,
            loading: false,
            message: data.msg,
          })
          localStorage.setItem('signedUp', JSON.stringify(true))
        }
      }
    )
  }
  onSubmit = event => {
    event.preventDefault()
    const valid = this.state.email.indexOf('@') > -1
    this.setState({
      valid: valid,
    })
    if (valid) {
      this.submitToMailChimp()
    }
  }
  signedUp = message => {
    this.setState({
      success: true,
      message: message,
    })
    console.log('Signed up')
  }

  reset = event => {
    event.preventDefault()
    this.setState({
      success: false,
      message: null,
    })
  }

  render() {
    return (
      <div
        style={{
          padding: rhythm(0.5),
          marginBottom: rhythm(0.5),
          textAlign: 'center',
        }}
        className={'form-group ' + style.container}
      >
        <h4 className={style.header}>
          <AlertCircle className={style.icon} size={20} />
          This course is currently under construction.
        </h4>
        {this.state.success}

        <p className={style.text}>
          {this.state.message || this.state.success
            ? this.state.message
            : 'Sign up to receive email notification when new lessons are released.'}
        </p>
        {!this.state.success ? (
          <div>
            <form
              className={'form-inline ' + style.form}
              onSubmit={this.onSubmit}
            >
              <div className={'form-group mx-auto'}>
                <input
                  type="email"
                  name="EMAIL"
                  className={'form-control'}
                  placeholder="Your email address"
                  onBlur={this.onBlur}
                  ref={this.emailInput}
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <button
                  className={'btn btn-primary ' + style.button}
                  type="submit"
                  disabled={!this.state.valid || this.state.loading}
                >
                  Remind Me
                </button>
              </div>
            </form>
            <div className={style.info}>
              {status === 'sending' && (
                <div style={{ color: 'blue' }}>Subscribing</div>
              )}
              {status === 'error' && (
                <div
                  style={{ color: 'red' }}
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              )}
              {status === 'success' && (
                <div style={{ color: 'green' }}>{message}</div>
              )}
            </div>
          </div>
        ) : this.state.message ? (
          ''
        ) : (
          <div>
            You have previously signed up to receive updates.{' '}
            <a href="#" onClick={this.reset}>
              Click here
            </a>{' '}
            to sign up again.
          </div>
        )}
      </div>
    )
  }
}

export default SignUpReminder
