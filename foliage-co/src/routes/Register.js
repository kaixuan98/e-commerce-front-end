import React, {useState} from 'react';
import { NavBar } from '../components/NavBar/NavBar';
import Style from '../styles/login.module.css';
import {useAuth} from '../hooks/AuthProvider';
import { Link } from 'react-router-dom';

const Register = () => {

    const {onRegister} = useAuth();
  // const location = useLocation();

    const [form, setForm] = useState({
        name: '',
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
        onRegister(form);
    }

    const handleVisibility = (e) => {
        setVisibility(e.target.checked);
    }

    return (
        <>
            <NavBar/>
            <form className={Style['form']} onSubmit={e => handleSubmit(e)}> 

                <div className={Style['form-input__container']}>
                    <label htmlFor="name">Name</label>
                    <input id="name" placeholder="name" type="text" onChange={handleChange}></input>
                </div>

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
                
                <p className={Style['form__register']}>Already have an account? <Link to="/login">Login</Link></p>

                <div className={Style['form-message__container']}>
                    <p className={Style['form__message']}></p> 
                </div>
            </form>
        </>
    )
}

export default Register