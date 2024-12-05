import React, { ChangeEvent, useState } from 'react';
import { NavBoat } from '../../../../models/naval-battle/NavBoat';
import Heading from '../../../../styles/components/Heading';
import { getAlphabetByIndex } from '../../../../utils/navUtils';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinate } from '../../../../models/naval-battle/Coordinate';
import { RootState } from '../../../../redux/store';
import { NavGame } from '../../../../models/naval-battle/NavGame';


const NavalBoat = ({boat}: {boat: NavBoat}) => {
    const dispatch = useDispatch();
    const navGame: NavGame = useSelector((state: RootState) => state.nav.navGame);
    const [startYCoordinate, setStartYCoordinate] = useState<number>();
    const [startXCoordinate, setStartXCoordinate] = useState<number>();
    const [possibleEndCoordinates, setPossibleEndCoordinates] = useState<Coordinate[]>([]);
    const [endCoordinate, setEndCoordinate] = useState<Coordinate>();
    const img = require(`${boat.img}`);

    const handleConfirmPlacement = () => {
        throw new Error('Function not implemented.');
    }

    const handleCancelPlacement = () => {
        throw new Error('Function not implemented.');
    }

    const handleStartYCoordinateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value: number = Number(event.target.value);
        setStartYCoordinate(value);
        updateEndCoordinates(startXCoordinate, value);
    }

    const handleStartXCoordinateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value: number = Number(event.target.value);
        setStartXCoordinate(value);
        updateEndCoordinates(value, startYCoordinate);
    }

    const updateEndCoordinates = (x: number | undefined, y: number | undefined) => {
        if (startYCoordinate && x) {
            const options = calculatePossibleEndCoordinates(startYCoordinate, x);
            setPossibleEndCoordinates(options);
        }
    };

    const handleEndCoordinateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
    }

    const calculatePossibleEndCoordinates = (y: number, x: number) => {
        const options = [];
        if (x + boat.length - 1 <= navGame.playingGround.width - 1) options.push(new Coordinate(x + boat.length - 1, y)); // Horizontal
        if (y + boat.length - 1 <= navGame.playingGround.height - 1) options.push(new Coordinate(x,y + boat.length - 1)); // Vertical
        return options;
    };

    return (
        <article className="boat-el">
                    <header><Heading level={4}>{boat.name.toUpperCase()}</Heading></header>
                    <figure>
                        <img src={img} alt={boat.name}/>
                        <figcaption>
                            <fieldset>
                                <span className="boat-el__label">SIZE</span>
                                <span className="boat-el__value">{boat.length}</span>
                            </fieldset>
                            
                            <fieldset>
                                <span className="boat-el__label">First coordinate</span>
                                <select value={startYCoordinate} onChange={handleStartYCoordinateChange}>
                                    <option value=""></option>
                                    {Array.from({length: navGame.playingGround.height}).map((_, index) => (
                                        index != 0 && <option key={index} value={index}>
                                            {getAlphabetByIndex(index)}
                                        </option>
                                    ))}
                                </select>
                                <select value={startXCoordinate} onChange={handleStartXCoordinateChange}>
                                    <option value=""></option>
                                    {Array.from({length: navGame.playingGround.width}).map((_, index) => (
                                        index != 0 && <option key={index} value={index}>
                                            {index}
                                        </option>
                                    ))}
                                </select>
                            </fieldset>
                            <fieldset>    
                                <span className="boat-el__label">Last coordinate</span>
                                {possibleEndCoordinates.length > 0 &&
                                    <select value={JSON.stringify(endCoordinate)} onChange={handleEndCoordinateChange}>
                                        <option value="">Select End</option>
                                        {possibleEndCoordinates.map((coord, index) => (
                                            <option key={index} value={JSON.stringify(coord)}>
                                                {`${getAlphabetByIndex(coord.y)}${coord.x}`}
                                            </option>
                                        ))}
                                    </select>
                                }
                            </fieldset>
                        </figcaption>
                    </figure>
                    <footer>
                        <button className="btn-primary" onClick={() => handleConfirmPlacement()} >CONFIRM</button>
                        <button className="btn-secondary" onClick={() => handleCancelPlacement()}>CANCEL PLACEMENT</button>
                    </footer>
               </article>
    )
}

export default NavalBoat;