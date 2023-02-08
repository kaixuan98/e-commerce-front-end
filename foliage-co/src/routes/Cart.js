import React, {useEffect, useState} from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { useAuth } from '../hooks/AuthProvider';

const Cart = () => {
  const {token} = useAuth(); 

  const [cart, setCart] = useState({});

  useEffect(() => {

    const getCart = () => {
      fetch('http://localhost:8080/cart', {
        method: 'GET', 
        mode: 'cors', 
        headers: { Authorization: "Bearer "+ token}
      }).then(res => res.json())
        .then(data => console.log(data))
    }
    getCart();
  }, [token])
  
  
  return (
    <>
      <NavBar></NavBar>
      <h1>Your Shopping Bag</h1>
      {/* {cart.message? (<p>{cart.message}</p>):(
        console.log(cart.items) )} */}
    </>
  )
}

export default Cart