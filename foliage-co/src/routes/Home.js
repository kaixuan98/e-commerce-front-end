import React from 'react'
import { NavBar } from '../components/NavBar/NavBar';
import heroImg from '../assets/homepage-hero.jpg';
import campaignImg1 from '../assets/campaign1.jpg';
import campaignImg2 from '../assets/campaign2.jpg';
import Style from '../styles/home.module.css';
import { Button } from '../components/Button';
import { useNavigate} from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/shop');
  }

  return (
    <>
      <NavBar/>
      <div className={Style['content__container']}>
        <div className={Style["hero-section"]}>
          <img src={heroImg} className={Style['hero-section__img']} alt="plants" width={800} height={800}></img> 
          <div className={Style["hero-section__content"]}>
            <h1>Bring the beauty of nature <br/>to your home</h1>
            <Button handleClick={handleClick}>View Collection</Button>
          </div>
        </div>

        <div className={Style["bestseller-section__container"]}>
          <h3>BestSeller</h3>
          <div className={Style["bestseller-section__cards-container"]}></div>
        </div>

        <div className={`${Style['campaign-section__container']} ${Style['campaign-section__container--bg']} ${Style['campaign-section__container--fullWidth']}`}>
          <img src={campaignImg1} alt="planting tree" width={300}></img>
          <div className={Style['campaign-section__content']}>
            <h3>One Plant , One Tree</h3>
            <p>Each plant that we sold, we will be giving back to the nature by planting a tree.<br></br> Start shopping to plant a good deed.</p>    
            <Button handleClick={handleClick}>View Collection</Button>   
          </div>
        </div>

        <div className={Style["campaign-section__container"]}>
          <div className={Style['campaign-section__content']}>
            <h3>Give the gift that will grows</h3>
            <p>From birthdays to housewarmings to just because, brighten someone's day and <br/>shop our favorite plants to give.</p>
            <Button handleClick={handleClick}>Shop Collection</Button>
          </div>
          <img src={campaignImg2} alt="holding a plant" width={300}></img>
        </div>
      </div>
    </>
  )
}

export default Home