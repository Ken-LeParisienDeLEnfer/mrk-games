import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { modifyFutTile } from "../../redux/slices/futSlices";
import './Fut.css';
import Main from "../../styles/components/Main";
import Heading from "../../styles/components/Heading";

function Fut() {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.fut);
    
    const handleStartGame = () => {
        //dispatch(initializeGame({ id: 1 }));
    };
    
    return (
        <Main>
            <span>Fut</span>
            { !game.futGame?.isStarted && <button onClick={handleStartGame}>Start Game</button>}
            <div className="fut-game">
                <section className="fut-tile-container">
                    {game.futGame?.tiles.map((tile, index) => (
                        <React.Fragment key={index}>
                            {tile.x === 0 && <br/> }
                            <button
                                key={`x${tile.x}y${tile.y}`}
                                onClick={() => dispatch(modifyFutTile({x: tile.x, y: tile.y}))}
                                className={'fut-tile ' + tile.cssClass}
                                style={{
                                    border: tile.isHasBall && game.futGame?.isMyTurn ? '5px solid #F9F300' : 'none',
                                }}
                            >
                                {tile.isRevealed && tile.value} {tile.isHasBall && "/@"}
                            </button>
                        </React.Fragment>
                    ))}
                </section>
                <section className="fut-turn">
                    {game.futGame?.isMyTurn && <Heading level={2}>YOUR TURN</Heading>}
                </section>
            </div>
        </Main>
    )
}

export default Fut;