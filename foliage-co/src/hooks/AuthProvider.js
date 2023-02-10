import React, {useState, createContext, useContext} from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext(null);

const AuthProvider = ( {children}) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const handleRegister = (form) => {
        fetch('http://localhost:8080/users/register', {  
            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify(form),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            setToken(data.token);
            setUser(data.user);
            navigate('/profile');
        });
    }

    const handleLogin = (form) => {
        fetch('http://localhost:8080/users/login', {  
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
            error.json().then( e => console.log(e))
        })
    }

    const handleLogout = () => {
        fetch('http://localhost:8080/users/logout', {
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
        fetch('http://localhost:8080/users/logoutAll', {
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