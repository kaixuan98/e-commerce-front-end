import React from 'react'
import Style from '../Loader/loader.module.css';

const Loader = () => {
  return (
    <div className={Style['spinner__container']}>
        <div className={Style['spinner']}></div>
    </div>
  )
}

export default Loader