import React from 'react'

const GameOver = (props) => {
    // console.log(props);
  return (
    <div className='gameOverPos'>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',justifyItems:'center'}}>
            <div className='gameOverInfo'>
                <h1>GAME OVER</h1>
                <h2>You Reached To Level {props.level}</h2>
                <h1>Your Score: {props.score}</h1>
                <button onClick={()=>{
                props.setShowGameOver(false);
                props.resetGame()
                }}>Play Again</button>
            </div>

        </div>
    </div>
  )
}

export default GameOver
