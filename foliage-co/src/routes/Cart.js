import React, {useEffect, useState, useContext} from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { useAuth } from '../hooks/AuthProvider';
import Loader from '../components/Loader/Loader';
import Style from '../styles/cart.module.css';
import ButtonStyle from '../components/Button/button.module.css';
import SnackbarContext from '../hooks/SnackBarContext';
import SnackBar from '../components/SnackBar/index'


const Cart = () => {
  const {token} = useAuth();
  const snackbarCtx = useContext(SnackbarContext);

  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [quantity, setQuantity] = useState(0); 

  useEffect(() => {
    setIsLoading(true);

    const getCart = () => {
      fetch('http://localhost:8080/cart', {
        method: 'GET', 
        mode: 'cors', 
        headers: { Authorization: "Bearer "+ token}
      }).then(res => res.json())
        .then(data => {
          setCart(data);
          setIsLoading(false);
        })
    }
    getCart();
    
  }, [token]) 

  const increament = (item) => {
    console.log(cart)
    cart.items.map( product => product.itemId === item.itemId? setCart(cart): '' )
  }

  const triggerSnackbar = (msg, type) => {
    snackbarCtx.displayMsg(msg, type);
  }
  const updateCartQuantiy = (itemId, quantity) => {
    fetch("http://localhost:8080/cart", {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
          itemId,
          quantity
      }),
      headers: {
          "Authorization": "Bearer "+ token,
          'Content-Type': 'application/json'
      }
  })
      .then(res => {
          if(res.ok){
              return res.json();
          }
          return Promise.reject(res);
      })
      .then(data => triggerSnackbar("Updated the bag!","Success"))
      .catch( (error) => {
          if(error.status === 401){
              error.json().then( () => triggerSnackbar("Please login before adding into shopping bag.", "Error"))
          }else{
              error.json().then( () => triggerSnackbar("Somthing went wrong.", "Error"))
          }
      })
  }

  const deleteItem = (itemId) => {
    fetch(`http://localhost:8080/cart/?itemId=${itemId}`, {
        method: 'DELETE', 
        mode: 'cors', 
        headers: { Authorization: "Bearer "+ token}
        })
        .then(res => res.json())
        .then(data => {
          setCart(data);
          setIsLoading(false);
        })
  }

  
  
  return (
    <>
      <NavBar></NavBar>
      <h1 className={Style['page__title']}>Your Shopping Bag</h1>
      {
        !isLoading? (
          cart?.message? 
            (<p>{cart.message}</p>):
            (cart?.items.map(item => 
              <>
                <div className={Style['bag-card__container']}>
                  <div className={Style['bag-card__image-container']}>

                  </div>
    
                  <div className={Style['bag-card__product-details']}>
                    <div className={Style['bag-card__product']}>
                      <p className={Style['product__text--primary']}>{item.name}</p>
                      <p className={Style['product__text--secondary']}>${item.price * item.quantity}</p>
                    </div>
    
                    <div className={Style['bag-card__quantity']}>
                      <button className={ButtonStyle['button']} > - </button>
                      <p className={Style['product__text--secondary']} >{item.quantity}</p>
                      <button className={ButtonStyle['button']} onClick={() => increament(item)}> + </button> 
                    </div>
    
                    <div className={Style['bag-card__remove-container']} onClick={() => deleteItem(item.itemId)}>&times;</div>
                  </div>
                </div>
                <hr></hr>
              </>
              )
            )
        ):(
          <Loader/>
        )
      }
      {snackbarCtx.isDisplayed && <SnackBar/>}
    </>
  )
}

export default Cart