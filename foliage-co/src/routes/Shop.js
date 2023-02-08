import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { NavBar } from '../components/NavBar/NavBar'
import Style from '../styles/shop.module.css';
import Loader from '../components/Loader/Loader'

const Shop = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    setIsLoading(true);
    const fetchPlants = () => {
      fetch('http://localhost:8080/items')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setIsLoading(false);
        });
    }
    fetchPlants();
  }, [])


  return (
    <>
      <NavBar/>
      {console.log(isLoading)}
      {
        !isLoading? (
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
        ):(
          <div className={Style['loader__wrapper']}>
              <Loader/>
          </div>
        )
      }
    </>
  )
}

export default Shop