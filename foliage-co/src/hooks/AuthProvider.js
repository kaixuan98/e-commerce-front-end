import React, {useState, createContext, useContext} from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext(null);

const AuthProvider = ( {children}) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const handleLogin = (form) => {
        fetch('http://localhost:8080/users/login', {  
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
        .then(data => {
            navigate('/login', {state: {snackBarMsg: data.message}});
        });
    }

    const value = {
        user,
        token, 
        onLogin: handleLogin,
        onLogout: handleLogout,
        onAllLogout: handleAllLogout,
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