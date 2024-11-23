import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FutGame } from '../../models/fut/FutGame';
import { FUT_TITLE, FUT_URI } from '../../constants/Constants';

interface FutState {
    futGame: FutGame | null;
}

const initialState: FutState = {
    futGame: null,
};

const futSlice = createSlice({
    name: 'futGame',
    initialState,
    reducers: {
        initializeGame(state,  action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            const futGame = new FutGame(id, FUT_TITLE, FUT_URI);
            futGame.init();
            return {...state, futGame: futGame.toPlainObject()}
        },
        modifyFutTile(state, action: PayloadAction<{ x: number, y: number }>) {
            const {x, y} = action.payload;
            if (state.futGame) {
                const tile = state.futGame.tiles.find((t) => t.x === x && t.y === y);
                if (tile) {
                    tile.isRevealed = true;
                }
            }
        }
    },
});

export const { initializeGame, modifyFutTile } = futSlice.actions;
export default futSlice.reducer;
