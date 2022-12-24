import React from 'react'
import './Header.css'
import plus from './../../Assets/plus.svg';

function Header({setVisible, setReload}) {


  return (
   <div className='header'>
      <h2 onClick={()=> setReload(true)}>To DO</h2>
      <span onClick={()=> setVisible(true)}><img src={plus} alt="new" /></span>
   </div>
  )
}

export default Header