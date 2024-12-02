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
            <section className="boats-to-position">
               { navGame.boats.map((boat, index) => {
                const img = require(`${boat.img}`);
                
                return <article key={index} className="boat-el">
                    <header><Heading level={4}>{boat.name.toUpperCase()}</Heading></header>
                    <figure>
                        <img src={img} alt={boat.name}/>
                        <figcaption>
                            <fieldset>
                                <span className="boat-el__label">SIZE</span>
                                <span className="boat-el__value">{boat.length}</span>
                            </fieldset>
                            
                            <fieldset>
                                <span className="boat-el__label">First coordinate</span><span className="boat-el__value">{getAlphabetByIndex(boat.coordinates[0]?.y)}{boat.coordinates[0]?.x}</span>
                            </fieldset>
                            <fieldset>    
                                <span className="boat-el__label">Last coordinate</span><span className="boat-el__value">{getAlphabetByIndex(boat.coordinates[boat.length - 1]?.y)}{boat.coordinates[boat.length - 1]?.x}</span>
                            </fieldset>
                        </figcaption>
                    </figure>
                    <footer>
                        <button className="btn-primary" onClick={() => handleSetCoordinate(boat)} >PLACE BOAT</button>
                        <button className="btn-secondary" onClick={() => handleCancelCoordinate(boat)}>CANCEL PLACEMENT</button>
                    </footer>
               </article>})} 
            
            </section>}
            
            
        </Main>
    );
}

export default NavalBattle;