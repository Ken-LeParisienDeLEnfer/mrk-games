import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FutGame } from '../../models/fut/FutGame';
import { FutActionEnum } from '../../models/fut/FutActionEnum';

const initialState = {
    futGame: new FutGame(1),
};

const futSlice = createSlice({
    name: 'futGame',
    initialState,
    reducers: {
        modifyFutTile(state, action: PayloadAction<{ x: number, y: number }>) {
            const {x, y} = action.payload;
            if (state.futGame) {
                const tile = state.futGame.tiles.find((t) => t.x === x && t.y === y);
                if (tile) {
                    tile.isRevealed = true;
                }
            }
        },
        setAction(state, action: PayloadAction<{userAction: FutActionEnum}>) {
            state.futGame.action = action.payload.userAction;
        }
    },
});

export const { modifyFutTile } = futSlice.actions;
export default futSlice.reducer;
