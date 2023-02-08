import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { NavBar } from '../components/NavBar/NavBar'
import Style from '../styles/shop.module.css'

const Shop = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchPlants = () => {
      fetch('http://localhost:8080/items')
        .then(res => res.json())
        .then(data => setProducts(data));
    }
    
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
              products.map( plant => <Link to={`/shop/${plant._id}`} key={plant._id}><Card product={plant}/></Link>)
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop