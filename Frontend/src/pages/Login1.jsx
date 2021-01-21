import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from '@material-ui/core';
import { login } from '../store/actions/userAction.js'
import { connect } from 'react-redux'
class _Login1 extends Component {
  state = {
    user: {
      username: '',
      password: '',
    },
    err: ''
  }
  handleChange = ({ target }) => {
    const field = target.name
    const value = target.value

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [field]: value
      }
    }))
  }
  // validate(values) {
  //   console.log(values);
  //   const errors = {};
  //   if (!values.email) {
  //     errors.email = 'Required';
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  //   ) {
  //     errors.email = 'Invalid email address';
  //   }
  //   if (values.password.length < 5) {
  //     errors.password = 'Password is too short!'
  //   }
  //   return errors;
  // }
  // onSubmitForm(values, { setSubmitting }) {
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2));
  //     setSubmitting(false);
  //   }, 400);
  // }
  onLogin = async (ev) => {
    try {
      await this.props.login(this.state.user)
      console.log(this.props.loggedInUser);
      if (this.props.loggedInUser) this.props.history.push('/boards')
    } catch (err) {
      // this.props.history.push('/login1')
      console.log('login', err);
      this.setState({ err: 'no user' })
    }
  }
  render() {
    return (
      <div>
        <h1>Any place in your app!</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          // validate={this.validate}
          onSubmit={this.onLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="username" required value={this.state.user.username} onChange={this.handleChange} placeholder="username" as={TextField} />
              <ErrorMessage name="username" className="err-msg" />
              <Field type="password" required placeholder="password" value={this.state.user.password} onChange={this.handleChange} as={TextField} name="password" />
              <ErrorMessage name="password" className="err-msg" component="span" />
              <button type="submit" disabled={isSubmitting}>
                Submit
          </button>
            </Form>
          )}
        </Formik>
      </div >
    )
  }
}
const mapGlobalStateToProps = (state) => {

  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser
  }

}

const mapDispatchToProps = {
  login
}
export const Login1 = connect(mapGlobalStateToProps, mapDispatchToProps)(_Login1)