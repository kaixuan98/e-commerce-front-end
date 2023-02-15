import React, {useState, createContext, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import SnackbarContext from "./SnackBarContext";



export const AuthContext = createContext(null);

const AuthProvider = ( {children}) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const snackbarCtx = useContext(SnackbarContext)

    const handleRegister = (form) => {
        
        const triggerSnackbar = (msg, type) => {
            snackbarCtx.displayMsg(msg, type);
        }
        fetch('http://15.223.3.11/users/register', {  
            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify(form),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(res);
        })
        .then(data => {
            setToken(data.token);
            setUser(data.user);
            navigate('/profile');
        }).catch( (error) => {
            error.json().then( e => console.log(e))
        })
    }

    const handleLogin = (form) => {
        const triggerSnackbar = (msg, type) => {
            snackbarCtx.displayMsg(msg, type);
        }

        fetch('http://15.223.3.11/users/login', {  
            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify(form),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
                if(res.ok){
                    return res.json();
                }
                return Promise.reject(res);
        })
        .then(data => {
            setToken(data.token);
            setUser(data.user);
            if(data.user.name === 'user123' && data.user._id === '63c50526ab5261b5d264dfc6'){
                navigate('/admin');
            }else{
                navigate('/profile');
            }
        }).catch( (error) => {
            error.json().then( e => triggerSnackbar(e.message, "Error"))
        })
    }

    const handleLogout = () => {
        fetch('http://15.223.3.11/users/logout', {
            method: 'POST', 
            mode: 'cors', 
            body: '',
            headers: { "Authorization": "Bearer "+ token}
        })
        .then( res => res.json())
        .then(data => {
            navigate('/login', {state: {snackBarMsg: data.message}});
            setUser(null);
            setToken(null);
        });
    }

    const handleAllLogout = () => {
        fetch('http://15.223.3.11/users/logoutAll', {
            method: 'POST', 
            mode: 'cors', 
            body: '',
            headers: { "Authorization": "Bearer "+ token}
        })
        .then( res => res.json())
        .then( data => {
            navigate('/login', {state: {snackBarMsg: data.message}});
            setUser(null);
            setToken(null);
        });
    }

    const value = {
        user,
        token, 
        onLogin: handleLogin,
        onLogout: handleLogout,
        onAllLogout: handleAllLogout,
        onRegister: handleRegister,
        useAuth, 
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider