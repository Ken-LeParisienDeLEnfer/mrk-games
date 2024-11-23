import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { initializeGame, modifyFutTile } from "../../redux/slices/futSlices";
import './Fut.css';

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
            <div className="fut-tile-container">
                {game.futGame?.tiles.map((tile, index) => (
                    <React.Fragment key={index}>
                        {tile.x === 0 && <br/> }
                        <button
                            key={`x${tile.x}y${tile.y}`}
                            onClick={() => dispatch(modifyFutTile({x: tile.x, y: tile.y}))}
                            className="fut-tile"
                            style={{
                            backgroundColor: tile.isRevealed ? 'red' : 'green',
                            }}
                        >
                            {tile.isRevealed ? 'toto' : ''}
                        </button>
                    </React.Fragment>
                ))}
      </div>
        </main>
    )
}

export default Fut;