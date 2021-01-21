import { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import { signup } from '../store/actions/userAction.js';


class _Signup extends Component {
  state = {
    user: {
      username: '',
      fullname: '',
      password: ''
    },
    err: {
      txt: ''
    }
  }
  handleChange = ({ target }) => {
    const field = target.name
    const value = (target.type === 'number') ? +target.value : target.value
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [field]: value
      }
    }))
  }
  onSignUpUser = async (ev) => {
    ev.preventDefault()
    try {
      await this.props.signup(this.state.user)
      this.props.history.push('/boards')
    } catch (err) {
      this.setState({ err })
    }
  }

  render() {
    const { user, err } = this.state
    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div style={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Avatar style={{
            margin: '10px',
            backgroundColor: 'blue',
          }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Sign Up
        </Typography>
          <div className="err">{err && err.txt}</div>
          <form onSubmit={this.onSignUpUser} style={{
            width: '100%',
            marginTop: '5px'
          }} >
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              autoFocus
              value={user.username}
              onChange={this.handleChange}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              value={user.fullname}
              onChange={this.handleChange}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={user.password}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              Sign Up
          </Button>
          </form>
        </div>
        <Box mt={8}>

        </Box>
      </Container >
    );
  }

}
const mapGlobalStateToProps = (state) => {

  return {
    users: state.userModule.users
  }

}

const mapDispatchToProps = {
  signup
}
export const Signup = connect(mapGlobalStateToProps, mapDispatchToProps)(_Signup)