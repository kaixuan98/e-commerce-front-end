import React from 'react'
import { Link } from 'react-router-dom';
import { NavBar } from '../components/NavBar/NavBar';
import Style from '../styles/login.module.css'

const Login = () => {
  return (
    <>
      <NavBar/>
      <form className={Style['form']}> 
        <div className={Style['form-input__container']}>
          <label for="username">Username</label>
          <input id="username" placeholder="Username" type="text"></input>
        </div>

        <div className={Style['form-input__container']}>
          <label for="password">Password</label>
          <input id="password" placeholder="Password" type="password"></input>
        </div>
        
        <p className={Style['form__register']}>Don't have an account? <Link to="/register">Register Now</Link></p>

        <div className={Style['form-message__container']}>
          <p className={Style['form__message']}></p> 
        </div>
      </form>
    </>
  )
}

export default Login