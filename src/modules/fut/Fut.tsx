import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { modifyFutTile, setAction } from "../../redux/slices/futSlices";
import './Fut.css';
import Main from "../../styles/components/Main";
import Heading from "../../styles/components/Heading";
import { FutActionEnum } from "../../models/fut/FutActionEnum";

function Fut() {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.fut);
    
    const handleStartGame = () => {
        //dispatch(initializeGame({ id: 1 }));
    };
    
    function isCanShoot(): boolean {
        const currentTileWithBall = game.futGame.tiles.find(tile => tile.isHasBall);
        return currentTileWithBall !== undefined && currentTileWithBall.y < Math.floor(game.futGame.playingGround.height / 2)
    }

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
                    {game.futGame?.isMyTurn && game.futGame.action === FutActionEnum.NONE && 
                    <div className="fut-turn__actions">
                        <button key={'btn-pass'} onClick={() => dispatch(setAction({userAction: FutActionEnum.PASS}))}
                        className="btn-fut-action"
                        >PASS THE BALL</button>
                        <button key={'btn-dribble'} onClick={() => dispatch(setAction({userAction: FutActionEnum.DRIBBLE}))}
                        className="btn-fut-action"
                        >DRIBBLE</button>
                        <button key={'btn-shoot'} onClick={() => dispatch(setAction({userAction: FutActionEnum.SHOOT}))}
                        className="btn-fut-action"
                        disabled={!isCanShoot()}
                        >SHOOT</button>
                        <button key={'btn-shoot'} onClick={() => dispatch(setAction({userAction: FutActionEnum.MOVE_ANOTHER_PLAYER}))}
                        className="btn-fut-action"
                        >MOVE ANOTHER PLAYER</button>
                    </div>}
                </section>
            </div>
        </Main>
    )
}

export default Fut;