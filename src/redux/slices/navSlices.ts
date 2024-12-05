import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamTypeEnum } from '../../models/TeamTypeEnum';
import { NavGame } from '../../models/naval-battle/NavGame';
import { Coordinate } from '../../models/naval-battle/Coordinate';
import { NavBoat } from '../../models/naval-battle/NavBoat';

const initialState = {
    navGame: new NavGame(1),
};

const navSlice = createSlice({
    name: 'navGame',
    initialState,
    reducers: {
        startGame(state, action: PayloadAction<{ player: TeamTypeEnum }>) { 
            state.navGame = {
                ...state.navGame,
                isStarted: true,
                isMyTurn: action.payload.player === TeamTypeEnum.USER,
                myPlayer: action.payload.player
            }
        },
        confirmBoatPosition(state, action: PayloadAction<{boat: NavBoat, startCoordinate: Coordinate, endCoordinate: Coordinate}>) {
            console.log(action.payload);
        }
    }
});

export const { 
    startGame,
    confirmBoatPosition
 } = navSlice.actions;
export default navSlice.reducer;