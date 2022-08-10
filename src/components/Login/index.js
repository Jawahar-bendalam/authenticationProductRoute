// Write your JS code here
import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'

const Login = props => {
  const accessToken = Cookies.get('jwt_token')

  const onLoginClick = async () => {
    const url = 'https://apis.ccbp.in/login'
    const username = 'rahul'
    const password = 'rahul@2021'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const jwtToken = data.jwt_token
      console.log(jwtToken)
      const {history} = props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    }
  }

  if (accessToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h1>Please Login</h1>
      <button type="button" onClick={onLoginClick}>
        Login with sample creds
      </button>
    </div>
  )
}

export default withRouter(Login)
