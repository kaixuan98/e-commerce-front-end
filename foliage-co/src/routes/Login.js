import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { NavBar } from '../components/NavBar/NavBar';
import Style from '../styles/login.module.css'
import {useAuth} from '../hooks/AuthProvider';
// import { useLocation } from 'react-router-dom';

const Login = () => {
  const {onLogin} = useAuth();
  // const location = useLocation();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isVisible, setVisibility] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(form);
  }

  const handleVisibility = (e) => {
    setVisibility(e.target.checked);
  }

  return (
    <>
      <NavBar/>
      <div className={Style['form__wrapper']}>
        <form className={Style['form']} onSubmit={e => handleSubmit(e)}> 
          <div className={Style['form-input__container']}>
            <label htmlFor="email">Email</label>
            <input id="email" placeholder="Email" type="email" onChange={handleChange}></input>
          </div>

          <div className={Style['form-input__container']}>
            <label htmlFor="password">Password</label>
            <input id="password" placeholder="Password" type={isVisible? 'text': 'password'} onChange={handleChange}></input>
          </div>

          <div className={Style['form-input__container--row']}>
              <input id="visibility" type="checkbox" onChange={handleVisibility}></input>
              <label htmlFor="visibility">Show Password</label>
          </div>

          <div className={Style['form-button__wrapper']}>
            <input type="submit" value="Submit"></input>
          </div>
          
          <p className={Style['form__register']}>Don't have an account? <Link to="/register">Register Now</Link></p>

          <div className={Style['form-message__container']}>
            <p className={Style['form__message']}></p> 
          </div>
        </form>
      </div>
    </>
  )
}

export default Login