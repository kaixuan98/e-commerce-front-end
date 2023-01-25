import React, {useState} from 'react';
import { Logo } from '../Logo/Logo';
import Styles from '../NavBar/navstyles.module.css';
import { MdOutlinePermIdentity , MdOutlineShoppingBag, MdMenu, MdClose} from "react-icons/md";
import { Link } from 'react-router-dom';

export const NavBar = () => {

    const [isToggle, setToggle] = useState(false); 

    return (
        <header className={Styles['navbar__wrapper']}>
            <div className={Styles['logo__container']}>
                <Link to="/"><Logo/></Link>
            </div>


            <ul className={`${Styles["navbar__list--middle"]} ${isToggle ? Styles["navbar__list--show"] : Styles["navbar__list--hide"]}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/blog">Blog</Link></li>
            </ul>


            <ul className={Styles['navbar__list--end']}>
                <li><Link to="/login"><MdOutlinePermIdentity size={24}/></Link></li>
                <li><Link to="/profile"><MdOutlineShoppingBag size={24}/></Link></li>
                <li className={Styles['hamburger']} onClick={()=> setToggle(!isToggle)}> {isToggle? <MdClose size={24}/>:<MdMenu size={24}/> } </li>
            </ul>
        </header>
    )
}
