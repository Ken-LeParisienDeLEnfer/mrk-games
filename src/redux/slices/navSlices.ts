import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamTypeEnum } from '../../models/TeamTypeEnum';
import { NavGame } from '../../models/naval-battle/NavGame';

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
    }
});

export const { 
    startGame,
 } = navSlice.actions;
export default navSlice.reducer;