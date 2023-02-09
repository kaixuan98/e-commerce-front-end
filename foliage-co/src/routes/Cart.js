import React, {useEffect, useState} from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { useAuth } from '../hooks/AuthProvider';
import Loader from '../components/Loader/Loader'; 

const Cart = () => {
  const {token} = useAuth(); 

  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    setIsLoading(true);
    const getCart = () => {
      fetch('http://localhost:8080/cart', {
        method: 'GET', 
        mode: 'cors', 
        headers: { Authorization: "Bearer "+ token}
      }).then(res => res.json())
        .then(data => {
          setCart(data.items);
          setIsLoading(false);
        })
    }
    getCart();
  }, [token]) 

  
  
  return (
    <>
      <NavBar></NavBar>
      <h1>Your Shopping Bag</h1>
      {
        isLoading? (<Loader/>):(
          cart.length > 0  ? (console.log(cart)):(console.log('cart is empty'))
          
        )
      }
      {/* {cart.message? 
        (<p>{cart.message}</p>):
        (cart.items.map( item => <p>{item.name}</p>))
      } */}
    </>
  )
}

export default Cart