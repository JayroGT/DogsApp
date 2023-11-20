import React from 'react'
import style from './Loading.module.css';

export const Loading = () => {
  return (
    <div className={style.load}>
        <div className={style.loader}></div>
    </div>  
  )
}
