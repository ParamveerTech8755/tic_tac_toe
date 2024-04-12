export default function GameOver({winner, onRematch}){

	const msg = winner ? `${winner.toUpperCase()} WON!` : "It's a DRAW!"

	return (
		<div id="game-over">
			<h2>Game Over</h2>
			<p>{msg}</p>
			<p><button onClick={onRematch}>Rematch</button></p>
		</div>
	)
}