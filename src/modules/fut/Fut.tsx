import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { initializeGame, modifyFutTile } from "../../redux/slices/futSlices";

function Fut() {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.fut);
    
    const handleStartGame = () => {
        dispatch(initializeGame({ id: 1 }));
    };
    
    return (
        <main>
            <span>Fut</span>
            <button onClick={handleStartGame}>Start Game</button>
            <div>
                {game.futGame?.tiles.map((tile) => (
                    <button
                        key={`x${tile.x}y${tile.y}`}
                        onClick={() => dispatch(modifyFutTile({x: tile.x, y: tile.y}))}
                        style={{
                        width: '40px',
                        height: '40px',
                        margin: '5px',
                        backgroundColor: tile.isRevealed ? 'red' : 'green',
                        }}
                    >
                        {tile.isRevealed ? 'toto' : ''}
                    </button>
                ))}
      </div>
        </main>
    )
}

export default Fut;