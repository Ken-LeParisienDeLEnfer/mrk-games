import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { modifyFutTile, possiblePassAction, possibleDribbleAction, possibleMoveAction, possibleShootAction, startGame } from "../../redux/slices/futSlices";
import './Fut.css';
import Main from "../../styles/components/Main";
import Heading from "../../styles/components/Heading";
import { FutActionEnum } from "../../models/fut/FutActionEnum";
import { FutTile } from "../../models/fut/FutTile";

function Fut() {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.fut);
    
    function isCanShoot(): boolean {
        const currentTileWithBall = game.futGame.tiles.find(tile => tile.isHasBall);
        return currentTileWithBall !== undefined && currentTileWithBall.y < Math.floor(game.futGame.playingGround.height / 2)
    }

    function handleTileDisabled(tile: FutTile): boolean | undefined {
        return true;
    }

    return (
        <Main>
            <span>Fut</span>
            { !game.futGame?.isStarted && <button onClick={() => dispatch(startGame())}>Start Game</button>}
            <div className="fut-game">
                <section className="fut-tile-container">
                    {game.futGame?.isStarted && game.futGame.tiles.map((tile, index) => (
                        <React.Fragment key={`${tile.x}-${tile.y}-${index}`}>
                            {tile.x === 0 && <br/> }
                            <button
                                key={`x${tile.x}y${tile.y}`}
                                onClick={() => dispatch(modifyFutTile({x: tile.x, y: tile.y}))}
                                className={`fut-tile ${tile.cssClass} ${tile.isHighlighted ? 'fut-tile__highlighted' : ''}`}
                                style={{
                                    border: tile.isHasBall && game.futGame?.isMyTurn ? '5px solid #F9F300' : '',
                                }}
                                disabled={tile.isDisabled}
                            >
                                {tile.isRevealed && tile.value} {tile.isHasBall && "/@"} {tile.isHighlighted && "H"}
                                {tile.nbAdvAround && <span>{tile.nbAdvAround}</span>}
                            </button>
                        </React.Fragment>
                    ))}
                </section>
                <div className="fut-turn">
                    {game.futGame?.isMyTurn && 
                    <section>
                        <Heading level={2}>YOUR TURN</Heading> 
                        <div className="fut-turn__actions">
                            <button key={'btn-pass'} onClick={() => dispatch(possiblePassAction())}
                            className={FutActionEnum.PASS === game.futGame.action ? "btn-fut-action btn-fut-action__selected" : "btn-fut-action"}
                            >PASS THE BALL</button>
                            <button key={'btn-dribble'} onClick={() => dispatch(possibleDribbleAction())}
                            className={FutActionEnum.DRIBBLE === game.futGame.action ? "btn-fut-action btn-fut-action__selected" : "btn-fut-action"}
                            >DRIBBLE</button>
                            <button key={'btn-shoot'} onClick={() => dispatch(possibleShootAction())}
                            className={FutActionEnum.SHOOT === game.futGame.action ? "btn-fut-action btn-fut-action__selected" : "btn-fut-action"}
                            disabled={!isCanShoot()}
                            >SHOOT</button>
                            <button key={'btn-move'} onClick={() => dispatch(possibleMoveAction())}
                            className={FutActionEnum.MOVE_ANOTHER_PLAYER === game.futGame.action ? "btn-fut-action btn-fut-action__selected" : "btn-fut-action"}
                            >MOVE ANOTHER PLAYER</button>
                        </div>
                    </section>}
                    {game.futGame?.isMyTurn && game.futGame.action !== FutActionEnum.NONE && 
                    (game.futGame.action === FutActionEnum.PASS && <section><Heading level={3}>CHOOSE THE PLAYER TO PASS THE BALL TO</Heading></section>
                    || game.futGame.action === FutActionEnum.DRIBBLE && <section><Heading level={3}>CHOOSE WHERE TO DRIBBLE TO</Heading></section>
                    || game.futGame.action === FutActionEnum.SHOOT && <section><Heading level={3}>CHOOSE YOUR SHOOT TRAJECTORY !</Heading></section>
                    || game.futGame.action === FutActionEnum.MOVE_ANOTHER_PLAYER && <section><Heading level={3}>CHOOSE ANOTHER PLAY TO MOVE HIM ON THE FIELD</Heading></section>)

                    }
                </div>
            </div>
        </Main>
    )
}

export default Fut;