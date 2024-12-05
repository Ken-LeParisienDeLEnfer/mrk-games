import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Heading from "../../styles/components/Heading";
import Main from "../../styles/components/Main";
import { NavGame } from "../../models/naval-battle/NavGame";
import { TeamTypeEnum } from "../../models/TeamTypeEnum";
import { startGame } from "../../redux/slices/navSlices";

import './NavalBattle.css';
import { NavActionEnum } from "../../models/naval-battle/NavActionEnum";
import { getAlphabetByIndex } from "../../utils/navUtils";
import { NavBoat } from "../../models/naval-battle/NavBoat";
import NavalBoat from "./components/NavalBoat/NavalBoat";
import React from "react";
import { NavReferentialTile } from "../../models/naval-battle/NavReferentialTile";
import { NavTile } from "../../models/naval-battle/NavTile";

function NavalBattle() {
    const dispatch = useDispatch();
    const navGame: NavGame = useSelector((state: RootState) => state.nav.navGame);

    function handleSetCoordinate (boat: NavBoat) : void {
        
    }

    function handleCancelCoordinate(boat: NavBoat): void {

    }
    return (
        <Main>
            <section className="game">
                <Heading level={1}>NAVAL BATTLE</Heading>
                { navGame.isStarted && <span className="player-tag">{navGame.myPlayer}</span>}
            </section>
            { !navGame?.isStarted && 
                <section className="select-player">
                    <Heading level={2}>CHOOSE PLAYER</Heading>
                    <Heading level={3}>you need to know that "PLAYER 1" will start to attack</Heading>
                    <div>
                        <button className="btn-primary" onClick={() => dispatch(startGame({player: TeamTypeEnum.PLAYER_1}))}>PLAYER 1</button>
                        <button className="btn-primary" onClick={() => dispatch(startGame({player: TeamTypeEnum.PLAYER_2}))}>PLAYER 2</button>
                    </div>
                </section>}
            {navGame.isStarted && navGame.action === NavActionEnum.POSITION_BOATS && 
                <div className="position-round">
                    <section className="boats-to-position">
                    { navGame.boats.map((boat, index) => <NavalBoat key={index} boat={boat} /> 
                    )}
                    </section>
                    <section className="position-map">
                        <div className="map-sticky">
                            {navGame.tiles.map((tile, index) => (
                            <React.Fragment key={`${tile.x}-${tile.y}-${index}`}>
                                {tile.x === 0 && <br/> }
                                <article className="nav-tile">
                                    {tile instanceof NavReferentialTile && <span>{tile.value}</span>}
                                    {tile instanceof NavTile && <span>{getAlphabetByIndex(tile.y)}{tile.x}</span>}
                                </article>
                            </React.Fragment>
                            ))}
                    </div>
                    </section>
                </div>
            }
            
        </Main>
    );
}

export default NavalBattle;