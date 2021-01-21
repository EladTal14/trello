import { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import { login } from '../store/actions/userAction.js'

export class _Login extends Component {
  state = {
    user: {
      username: '',
      password: '',
    },
    err: ''
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
  onLogin = async (ev) => {
    console.log(ev);
    ev.preventDefault()
    try {
      ev.preventDefault()
      await this.props.login(this.state.user)
      console.log(this.props.loggedInUser);
      if (this.props.loggedInUser) this.props.history.push('/boards')
    } catch (err) {
      ev.preventDefault()
      this.props.history.push('/login')
      console.log('login', err);
      this.setState({ err: 'no user' })
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
            Login
        </Typography>
          <div className="err">{err}</div>
          <form style={{
            width: '100%',
            marginTop: '5px'
          }} >
            <TextField
              variant="outlined"
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
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={this.handleChange}
            />
            {err && <span>err</span>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
              onClick={this.onLogin}
            >
              Login
          </Button>
            <Grid container>
              <Grid item xs style={{ marginTop: '10px' }}>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item style={{ marginTop: '10px' }}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser
  }

}

const mapDispatchToProps = {
  login
}
export const Login = connect(mapGlobalStateToProps, mapDispatchToProps)(_Login)