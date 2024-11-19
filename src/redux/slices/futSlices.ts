import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FutGame } from '../../models/fut/FutGame';

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
            state.futGame = new FutGame(id);
            state.futGame.init();
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
