import React, { useEffect, useState } from 'react'
import red from '../images/red-candy.png'
import green from '../images/green-candy.png'
import yellow from '../images/yellow-candy.png'
import blue from '../images/blue-candy.png'
import purple from '../images/purple-candy.png'
import orange from '../images/orange-candy.png'
import blank from '../images/blank.png'
import sound from '../Sound/sound.mp3'
import Score from './Score'
import GameOver from './GameOver'



const Game = () => {
    const color=[red,green,yellow,blue,purple,orange]
    const width=8
    const [currentCandiesArrangements,setCurrentCandiesArrangements]=useState([])
    const [startId,setStartId]=useState(null)
    const [endId,setEndId]=useState(null)
    const [score,setScore]=useState(0);
    const [level,setLevel]=useState(1);
    const [scoreToReach,setScoreToReach]=useState(200);
    const [moves,setMoves]=useState(2);
    const [showGameOver,setShowGameOver]=useState(false)
    

    const playSound=()=>{
        
        new Audio(sound).play()
        
    }
    const resetGame=()=>{
        setScore(0)
        setScoreToReach(20)
        setLevel(1)
        setMoves(10)
    }

    const checkIfLevelClearOrNot=()=>{
        if(score>=scoreToReach-3 && moves>=0){
           
            setLevel((level)=>level+1)
            setScoreToReach((scoreToReach)=>scoreToReach+40)
            setMoves((moves)=>moves+7)
        }else if(score<=scoreToReach-3 && moves<=1){
            
            setShowGameOver(true)
           
            
        }
    }
    

    const checkForColumnOfFive=()=>{
        for(let i=0;i<=31;i++){
            let columnOfFour=[i,i+width,i+width*2,i+width*3,i+width*4]
            let decidedColor=currentCandiesArrangements[i];
            if(columnOfFour.every((index)=>currentCandiesArrangements[index]===decidedColor)){
                columnOfFour.forEach((index)=>currentCandiesArrangements[index]=blank)
                if(decidedColor!=blank){
                    playSound()
                    setScore((score)=>score+5)
                }
                return true
            }
        }
    }
    const checkForRowOfFive=()=>{
        const notValid=[4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55,60,61,62,63]
        for(let i=0;i<64;i++){
            if(notValid.includes(i)){
                continue;
            }
            let rowOfFive=[i,i+1,i+2,i+3,i+4]
            let decidedColor=currentCandiesArrangements[i]
            if(rowOfFive.every((index)=>currentCandiesArrangements[index]===decidedColor)){
                rowOfFive.forEach((index)=>currentCandiesArrangements[index]=blank)
                if(decidedColor!=blank){
                    playSound()
                    setScore((score)=>score+5)
                }
                return true;
            }
        }

    }
    const checkForRowOfFour=()=>{
        const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,61,62,63]
        for(let i=0;i<64;i++){
            if(notValid.includes(i)){
                continue;
            }
            let rowOfFour=[i,i+1,i+2,i+3]
            let decidedColor=currentCandiesArrangements[i]

            if(rowOfFour.every((index)=>currentCandiesArrangements[index]===decidedColor)){
                rowOfFour.forEach((index)=>currentCandiesArrangements[index]=blank)
                if(decidedColor!=blank){
                    playSound()
                    setScore((score)=>score+4)
                }
                return true
            }
            
        }
    }

    const checkForRowOfThree=()=>{
        const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]
        for(let i=0;i<64;i++){
            if(notValid.includes(i)){
                continue;
            }
            const rowOfThree=[i,i+1,i+2]
            const decidedColor =currentCandiesArrangements[i]
            if(rowOfThree.every((index)=>currentCandiesArrangements[index]===decidedColor)){
                rowOfThree.forEach((index)=>currentCandiesArrangements[index]=blank)
                if(decidedColor!=blank){
                    playSound()
                    setScore((score)=>score+3)
                }
                return true
            }
        }
    }
    const checkForColumnOfFour=()=>{
        for(let i=0;i<=39;i++){
            let columnOfFour=[i,i+width,i+width*2,i+width*3]
            let decidedColor=currentCandiesArrangements[i];
            if(columnOfFour.every((index)=>currentCandiesArrangements[index]===decidedColor)){
                columnOfFour.forEach((index)=>currentCandiesArrangements[index]=blank)
                if(decidedColor!=blank){
                    playSound()
                    setScore((score)=>score+4)
                }
                return true
            }
        }
    }
    const checkForColumnOfThree=()=>{
        for(let i=0;i<=47;i++){
            let columnOfThree=[i,i+width,i+width*2]
            let decidedColor=currentCandiesArrangements[i];
            if(columnOfThree.every((index)=>currentCandiesArrangements[index]===decidedColor)){
                columnOfThree.forEach((index)=>currentCandiesArrangements[index]=blank)
                if(decidedColor!=blank){
                    playSound()
                    setScore((score)=>score+3)
                }
                return true
            }
            
        }
    }

    const moveIntoSquareBelowIfEmpty=()=>{
        
        for(let i=0;i<=55;i++){
            if(i<8 && currentCandiesArrangements[i]===blank){
                currentCandiesArrangements[i]=color[Math.floor(Math.random()*color.length)]
            }
            if(currentCandiesArrangements[i+width]===blank){
                currentCandiesArrangements[i+width]=currentCandiesArrangements[i];
                currentCandiesArrangements[i]=blank
            }
        }
    }

    const handleDragStart=(e)=>{
        
        setStartId(parseInt(e.target.dataset.id));
    }
    const handleDragDrop=(e)=>{
        
        setEndId(parseInt(e.target.dataset.id))
    }
    const handleDragEnd=()=>{
        const checkValidMove=[startId+1,startId-1,startId+width,startId-width]
        if(checkValidMove.includes(endId)){
            let tempsq=currentCandiesArrangements[startId];
            currentCandiesArrangements[startId]=currentCandiesArrangements[endId]
            currentCandiesArrangements[endId]=tempsq
            let colFive=checkForColumnOfFive()
            let rowFive=checkForRowOfFive()
            let rowFour=checkForRowOfFour()
            let colFour=checkForColumnOfFour()
            let colThree=checkForColumnOfThree()
            let rowThree=checkForRowOfThree()
            if(colFive||rowFive||colFour||rowFour||colThree||rowThree){
                setStartId(null)
                setEndId(null)
                setMoves((moves)=>moves-1)
                checkIfLevelClearOrNot()
                
            }else{
                tempsq=currentCandiesArrangements[startId];
                currentCandiesArrangements[startId]=currentCandiesArrangements[endId]
                currentCandiesArrangements[endId]=tempsq
            }
            
            
        }
       
    }
    

    const createGameBoard=()=>{
        
        for(let i=0;i<width*width;i++){
            let randomColor=color[Math.floor(Math.random()*6)]
            
            currentCandiesArrangements[i]=randomColor
        }
        setCurrentCandiesArrangements([...currentCandiesArrangements])
        
        
    }
    useEffect(()=>{
        createGameBoard()
        
    },[])

    useEffect(()=>{
        const timer=setInterval(()=>{
            // console.log(timer);
            checkForColumnOfFive()
            checkForRowOfFive()
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelowIfEmpty()
            setCurrentCandiesArrangements([...currentCandiesArrangements])
        },100)
        return ()=>{
            // console.log("timer in return function",timer);
            clearInterval(timer)
        }
    },[currentCandiesArrangements])

  return (
    <>
    {!showGameOver&&<div>

        <div className='gameArea'>
                <Score score={score}/>
            <div className='scoreInfo'>
                <h3>Level:{level}</h3>
                <h3>Moves-Left:{moves}</h3>
                <h3>Score To Reach:{scoreToReach}</h3>
            </div>
            
            <div className='gameSquare'>
                {currentCandiesArrangements.map((candyColor,i)=>{
                return <img 
                src={candyColor}
                key={i} 
                
                alt={candyColor} 
                data-id={i}  
                className='candy' 
                draggable={true}
                onDragStart={handleDragStart}
                onDragOver={(e)=>e.preventDefault()}
                onDragEnter={(e)=>e.preventDefault()}
                onDragLeave={(e)=>e.preventDefault()}
                onDrop={handleDragDrop}
                onDragEnd={handleDragEnd}
                
                />
                })}
                
            </div>
        </div>
    </div>}
    {showGameOver&&<GameOver level={level} resetGame={resetGame} score={score} setShowGameOver={setShowGameOver}/>}
    </>
  )
}

export default Game
