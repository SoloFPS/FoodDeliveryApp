import React, { useState, useContext } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './loginpopup.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'


const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState("Sign Up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url
    if (currState === 'Sign Up') {
      newUrl += '/api/user/register'
    }

    else {
      newUrl += '/api/user/login'
    }

    const response = await axios.post(newUrl, data)
    console.log(response.data)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      setShowLogin(false)
    }

    else
    {
      alert(response.data.message)
    }

  }

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData({ ...data, [name]: value })
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => { setShowLogin(false) }} src={assets.cross_icon} alt='' />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Sign Up' ? <input type='text' onChange={onChangeHandler} name='name' value={data.name} placeholder='name' required /> : <></>}
          <input type='email' onChange={onChangeHandler} name='email' value={data.email} placeholder='email' required />
          <input type='password' onChange={onChangeHandler} name='password' value={data.password} placeholder='password' required />
        </div>
        <button type='submit'>{currState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        <div className="login-popup-condition">
          <input type='checkbox' required></input>
          <p>By agreeing, I accept the terms and conditions and privacy policy</p>
        </div>
        {currState === 'Login' ? <p>Create a new account? <span onClick={() => { setCurrState('Sign Up') }}>click here</span></p> : <p>Already have an account? <span onClick={() => { setCurrState('Login') }}>Sign in</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup
