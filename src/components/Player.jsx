import {useState} from "react"

export default function Player({initName, symbol, isActive, onNameEdit}){

	const [playerName, setPlayerName] = useState(initName)
	const [isEditing, setIsEditing] = useState(false)

	function handleChange(event){
		setPlayerName(event.target.value)
	}

	return (
		<li className={isActive ? "active" : undefined}>
            <span className="player">
              {
              	isEditing ? 
              	<input onChange={handleChange} value={playerName} />
              	:
              	<span className="player-name">{playerName}</span>
              }
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => {
            		if(isEditing)
            			onNameEdit(symbol, playerName)
            		setIsEditing(state => !state)
            	}
            	}>{isEditing ? "Save" : "Edit"}</button>
        </li>
	)
}