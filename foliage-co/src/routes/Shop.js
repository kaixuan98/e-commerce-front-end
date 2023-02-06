import React,{useState, useEffect} from 'react'
import Card from '../components/Card';
import { NavBar } from '../components/NavBar/NavBar'
import Style from '../styles/shop.module.css'

const Shop = () => {

  const [products, setProducts] = useState([]);

  const fetchPlants = () => {
    fetch('http://localhost:8080/items')
      .then(res => res.json())
      .then(data => setProducts(data));
  }
  useEffect(() => {
    fetchPlants()
  }, [])


  return (
    <>
      <NavBar/>
      <div className={Style['catalog__wrapper']}>
        <h2>Explore our plants</h2>
        <div className={Style['catalog__container']}>
          <div className={Style['catalog']}>
            {
              products.map( plant => <Card product={plant}/>)
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop