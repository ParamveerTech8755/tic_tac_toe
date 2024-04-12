
export default function GameBoard({onSelect, player, board}){

	function handleClick(row, col){
		if(board[row][col]) return;
		onSelect(row, col)
		
	}

	return (
		<ol id="game-board">
			{board.map((row, index) => 
				<li key={index}>
					<ol>
						{row.map((playerSymbol, ind) => 
							<li key={ind}>
								<button onClick={() => handleClick(index, ind)}>{playerSymbol}</button>
							</li>
						)}	
					</ol>
				</li>)
			}
		</ol>
	)
}