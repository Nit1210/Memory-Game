
import { useEffect, useState } from 'react';

import './App.css';
import SingleCards from './components/SingleCards.js';

const cradImages=[
  {"src":"/img/helmet-1.png",matched:false},
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false},

]

function App() {
  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0);
  const [selectionOne,setSelectionOne]=useState(null);
  const [selectionTwo,setSelectionTwo]=useState(null);
  const [disable,setDisable]=useState(null);
  const shuffleCards=()=>{
     const shuffledCards=[...cradImages,...cradImages]
     .sort(()=>Math.random()-0.5)
     .map((card)=>({...card,id:Math.random()}))
     setSelectionOne(null);
     setSelectionTwo(null);
    setCards(shuffledCards)
    setTurns(0);
  }
  
  //handle  card selections
  const handleSelection=(card)=>{
    selectionOne ? setSelectionTwo(card):setSelectionOne(card)
  }
 
  useEffect(()=>{
    if(selectionOne&&selectionTwo){
      setDisable(true)
      if(selectionOne.src===selectionTwo.src && selectionOne.id!==selectionTwo.id ){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src===selectionOne.src){
              return {...card,matched:true}
            }
            else{
              return card
            }
          })
        })
        returnTurn();
      }
      else{
        console.log("No match")
        setTimeout(()=>returnTurn(),1000)
        
      }
    }
    console.log(cards)
  },[selectionOne,selectionTwo])
  const returnTurn=()=>{
    setSelectionOne(null);
    setSelectionTwo(null);
    setTurns(prevTurns=> prevTurns+1)
    setDisable(false);
    console.log(turns)
  }
  useEffect(()=>{
    shuffleCards()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Magic-Memory</h1>
        <button onClick={shuffleCards}>New Game</button>
      </header>

      <div className='card-grid'>
        {cards.map(card=>(
           <SingleCards card={card} handleSelection={handleSelection}
           flipped={card=== selectionOne|| card===selectionTwo ||card.matched}
           disable={disable}/>
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
