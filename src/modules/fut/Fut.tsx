import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { possiblePassAction, possibleDribbleAction, possibleMoveAction, possibleShootAction, startGame, nextAction } from "../../redux/slices/futSlices";
import './Fut.css';
import Main from "../../styles/components/Main";
import Heading from "../../styles/components/Heading";
import { FutActionEnum } from "../../models/fut/FutActionEnum";
import { FutGame } from "../../models/fut/FutGame";
import FutActionButton from "./components/FutActionButton/FutActionButton";
import ballLostImg from './assets/BallLost-removebg-preview.png';
import dribbleLostImg from './assets/dribbleLost-removebg-preview.png';

function Fut() {
    const dispatch = useDispatch();
    const futGame: FutGame = useSelector((state: RootState) => state.fut.futGame);
    
    function isCanShoot(): boolean {
        const currentTileWithBall = futGame.tiles.find(tile => tile.isHasBall);
        return currentTileWithBall !== undefined && currentTileWithBall.y < Math.floor(futGame.playingGround.height / 2)
    }

    return (
        <Main>
            <span>Fut</span>
            { !futGame?.isStarted && <button onClick={() => dispatch(startGame())}>Start Game</button>}
            <div className="fut-game">
                <section className="fut-tile-container">
                    {futGame.isStarted && futGame.tiles.map((tile, index) => (
                        <React.Fragment key={`${tile.x}-${tile.y}-${index}`}>
                            {tile.x === 0 && <br/> }
                            <FutActionButton tile={tile} />
                        </React.Fragment>
                    ))}
                </section>
                <div className="fut-turn">
                    {futGame.isMyTurn && 
                    <section>
                        <Heading level={2}>YOUR TURN</Heading> 
                        <div className="fut-turn__actions">
                            <button key={'btn-pass'} onClick={() => dispatch(possiblePassAction())}
                            className={FutActionEnum.PASS === futGame.action ? "btn-fut-action btn-fut-action__selected" : "btn-fut-action"}
                            >PASS THE BALL</button>
                            <button key={'btn-dribble'} onClick={() => dispatch(possibleDribbleAction())}
                            className={FutActionEnum.DRIBBLE === futGame.action ? "btn-fut-action btn-fut-action__selected" : "btn-fut-action"}
                            >DRIBBLE</button>
                            <button key={'btn-shoot'} onClick={() => dispatch(possibleShootAction())}
                            className={FutActionEnum.SHOOT === futGame.action ? "btn-fut-action btn-fut-action__selected" : "btn-fut-action"}
                            disabled={!isCanShoot()}
                            >SHOOT</button>
                            <button key={'btn-move'} onClick={() => dispatch(possibleMoveAction())}
                            className={FutActionEnum.MOVE_ANOTHER_PLAYER === futGame.action ? "btn-fut-action btn-fut-action__selected" : "btn-fut-action"}
                            >MOVE ANOTHER PLAYER</button>
                        </div>
                    </section>}
                    {futGame.isMyTurn && futGame.action !== FutActionEnum.NONE && 
                    (futGame.action === FutActionEnum.PASS && <section><Heading level={3}>CHOOSE THE PLAYER TO PASS THE BALL TO</Heading></section>
                    || futGame.action === FutActionEnum.DRIBBLE && <section><Heading level={3}>CHOOSE WHERE TO DRIBBLE TO</Heading></section>
                    || futGame.action === FutActionEnum.SHOOT && <section><Heading level={3}>CHOOSE YOUR SHOOT TRAJECTORY !</Heading></section>
                    || futGame.action === FutActionEnum.MOVE_ANOTHER_PLAYER && <section><Heading level={3}>CHOOSE ANOTHER PLAY TO MOVE HIM ON THE FIELD</Heading></section>)
                    }
                    {
                        futGame.isMyTurn && futGame.action === FutActionEnum.PASS && futGame.isFinished && 
                        <section className="ball-lost">
                            <Heading level={3}>BALL LOST !</Heading>
                            <img src={ballLostImg} alt="Ball lost" />
                        </section>
                    }
                    {
                        futGame.isMyTurn && futGame.action === FutActionEnum.DRIBBLE && futGame.isFinished && 
                        <section className="ball-lost">
                            <Heading level={3}>BALL LOST !</Heading>
                            <img className="img-dribble-lost" src={dribbleLostImg} alt="Ball lost" />
                        </section>
                    }
                    {
                        futGame.isMyTurn && futGame.action !== FutActionEnum.NONE && !futGame.isFinished && futGame.isActionFinished &&
                        <button className="btn-primary" onClick={() => dispatch(nextAction())}>NEXT</button>
                    }
                </div>
            </div>
        </Main>
    )
}

export default Fut;