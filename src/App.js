
import { useState } from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  const [playGame,setPlayGame]=useState(false);
  const [showPlayGameBtn,setShowPlayGameBtn]=useState(true);
  return (
    <div className="App">
     
      {showPlayGameBtn&&<button className='btn-ani' onClick={()=>{
        setPlayGame(true)
        setShowPlayGameBtn(false)
        }}>Play Game</button>}
      {playGame && <Game/>}
    </div>
  );
}

export default App;
