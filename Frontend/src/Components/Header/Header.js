import React from 'react'
import './Header.css'
import plus from './../../Assets/plus.svg';

function Header({setVisible}) {


  return (
   <div className='header'>
      <h2>To DO</h2>
      <span onClick={()=> setVisible(true)}><img src={plus} alt="new" /></span>
   </div>
  )
}

export default Header