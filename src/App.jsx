import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import {useState} from "react"
import Log from "./components/Log"
import {WINNING_COMBINATIONS} from "./winning-combinations.js"
import GameOver from "./components/GameOver"

let gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function App() {

  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2"
  })
  const [gameTurns, setGameTurns] = useState([])

  if(gameTurns.length > 0){
    const turn = gameTurns[0]
    const {square: {row, col}, player} = turn
    gameBoard[row][col] = player
  }
  let winner = undefined
  let isDraw = false

  for(const ele of WINNING_COMBINATIONS){
    const firstEle = gameBoard[ele[0].row][ele[0].column]
    const secondEle = gameBoard[ele[1].row][ele[1].column]
    const thirdEle = gameBoard[ele[2].row][ele[2].column]
    // console.log(firstEle, secondEle, thirdEle)

    if(firstEle && firstEle === secondEle && firstEle === thirdEle)
      winner = firstEle
  }

    if(!winner && gameTurns.length === 9)
      isDraw = true


  function handleMove(row, col){
    setGameTurns(prevTurns => {
      let currentPlayer = 'X'
      if(prevTurns.length > 0 && prevTurns[0].player === 'X')
        currentPlayer = 'O'


      return [{square: {row, col}, player: currentPlayer}, ...prevTurns]
    })
  }

  function handleRestart(){
    setGameTurns([])
    gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  }

  function handlePlayerNameChange(symbol, name){
    setPlayers(oldNames => {
      const newNames = {...oldNames}
      newNames[symbol] = name.toString()
      return newNames
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initName="Player 1" onNameEdit={handlePlayerNameChange}
            symbol="X" isActive={gameTurns.length == 0 ? true:gameTurns[0].player === 'O'} />
          <Player initName="Player 2" onNameEdit={handlePlayerNameChange}
            symbol="O" isActive={gameTurns.length == 0 ? false:gameTurns[0].player === 'X'} />
        </ol>
        {(winner || isDraw) && <GameOver winner={players[winner]} onRematch={handleRestart}/>}
        <GameBoard onSelect={handleMove} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}


export default App
