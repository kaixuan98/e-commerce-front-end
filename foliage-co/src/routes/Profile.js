import React, {useEffect, useState}  from 'react';
import { NavBar } from '../components/NavBar/NavBar';
import {useAuth} from '../hooks/AuthProvider';
import ButtonStyle from '../components/Button/button.module.css';
import OrderCard from '../components/Card/OrderCard';

const Profile = () => {
    const {user, onLogout, onAllLogout, token} = useAuth();
    const [orders, setOrders] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:8080/orders', {
            method: 'GET', 
            mode: 'cors', 
            headers: { Authorization: "Bearer "+ token}
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data);
        })
    }, [token])
    

    return (
        <div>
            <NavBar/>
            <div>
                <h2>Your Profile</h2>
                <p>Name: {user.name}</p>
                <div className={ButtonStyle['button-group']}>
                    <button onClick={onLogout} className={ButtonStyle['button']}>Log Out</button>
                    <button onClick={onAllLogout} className={ButtonStyle['button']}>Log Out All</button>
                </div>
            </div>
            <div>
                <h2>Order History</h2>
                <div>
                    {
                        orders.length <= 0 ? (
                            <p>No Orders Yet.</p>
                        ):(
                            orders.map( (order) => (
                                <OrderCard order={order}/>
                            ))
                        )
                    }
                </div>
            </div>

        </div>

    )
}

export default Profile