import React from 'react'
import './SingleCards.css'
export default function SingleCards ({card,handleSelection,flipped,disable})  {
  const handleClick=()=>{
    if(!disable){
      handleSelection(card)
    }
   
  }
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped":""}>
      <img className="front" src={card.src} alt='card-front'/>
      <img className="back" 
             src='/img/cover.png' 
             onClick={handleClick} 
             alt='card-back'/>
      </div>
  </div>
  )
}
