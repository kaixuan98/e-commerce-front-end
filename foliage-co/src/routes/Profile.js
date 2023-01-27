import React  from 'react';
import { NavBar } from '../components/NavBar/NavBar';
import {useAuth} from '../hooks/AuthProvider';

const Profile = () => {
    const {user, onLogout, onAllLogout} = useAuth();

    return (
        <div>
            <NavBar/>
            <p>Welcome {user.name}</p>
            <button onClick={onLogout}>LogOut</button>
            <button onClick={onAllLogout}>LogOut All</button>
        </div>

    )
}

export default Profile