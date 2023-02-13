import React, {useContext} from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import Loader from '../components/Loader/Loader';
import Style from '../styles/cart.module.css';
import BagCard from '../components/Card/BagCard';
import { CartContext } from '../hooks/CartContext';
import ButtonStyle from '../components/Button/button.module.css'


const Cart = () => {
  const {contextValue, isLoading} = useContext(CartContext);  

  const handleClick = () => {
    contextValue.checkOut();
  }

  return (
    <>
      <NavBar></NavBar>
      <h1 className={Style['page__title']}>Your Shopping Bag</h1>
      <div className={Style['cart__wrapper']}>
        <div className={Style['cart__container']}>
          { 
            !isLoading? (
              contextValue.items?.length > 0 ? (
                contextValue.items.map( item => <BagCard key={item.itemId} item={item}/>)
              ):(
                <p>Your Cart is Empty!</p>
              )
            ):(
              <Loader/>
            )
          }
        </div>
        {
          contextValue.items === undefined ||contextValue.items?.length <= 0  ? (
              <></>
          ):(
              <div className={Style['cart__billContainer']}>
                  <p className={Style['bill__title']}>Total</p>
                  <p className={Style['bill__total']}>$ {contextValue.bill}</p>
                  <div className={ButtonStyle['button-group']}>
                    <button className={ButtonStyle['button']} onClick={handleClick}>Checkout</button>
                    <button className={`${ButtonStyle['button']} ${ButtonStyle['button--outline']}`}>Cancel</button>
                  </div>
              </div>
          )
        }

      </div>
    </>
  )
}

export default Cart