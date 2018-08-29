import React from 'react'
import { rhythm } from '../utils/typography'

class SignUpReminder extends React.Component {
  render() {
    return (
      <div
        style={{
          padding: rhythm(0.5),
          marginBottom: rhythm(0.5),
          textAlign: 'center',
        }}
        className="form-group"
      >
        <h4>Sign Up For New Lessons</h4>
        <p>
          This course is currently under construction. <br />
          Sign up recieve email reminders when new lessons are released.
        </p>
        <form className="form-inline">
          <div className="form-group mx-auto">
            <input
              type="email"
              className="form-control"
              placeholder="Your email address"
            />
            <button className="btn btn-primary">Remind Me</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUpReminder
