import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FutGame } from '../../models/fut/FutGame';
import { FutActionEnum } from '../../models/fut/FutActionEnum';
import { FutTeam } from '../../models/fut/FutTeam';
import { TeamType } from '../../models/TeamType';
import { FutTile } from '../../models/fut/FutTile';

const initialState = {
    futGame: new FutGame(1),
};

const futSlice = createSlice({
    name: 'futGame',
    initialState,
    reducers: {
        startGame(state) {
            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((t: FutTile) => {
                if(t.team && t.team.type === TeamType.USER && t.isHasBall) {
                    return {
                        ...t,
                        nbAdvAround: 
                        [...state.futGame.tiles].filter(
                        tile => tile.team?.type === TeamType.CPU && Math.abs(tile.x - t.x) <= 1 && Math.abs(tile.y - t.y) <= 1
                        ).length
                    }
                }
                return t
            });
            
            state.futGame = {
                ...state.futGame,
                tiles: tilesUpdated,
                isStarted: true,
                isMyTurn: true
            }
        },
        modifyFutTile(state, action: PayloadAction<{ x: number, y: number }>) {
            const {x, y} = action.payload;
            const tile = state.futGame.tiles.find((t) => t.x === x && t.y === y);
            if (tile) {
                tile.isRevealed = true;
            }
            
        },
        possiblePassAction(state) {
            const tileSelected = [...state.futGame.tiles].find(tile => tile.team && tile.team.type === TeamType.USER && tile.isHasBall);
            

            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((tile: FutTile) => { 
                const isHighlightedAndEnabled = tileSelected !== undefined && tile.team?.type === TeamType.USER && !tile.isHasBall && Math.abs(tile.x - tileSelected.x) <= 1 && Math.abs(tile.y - tileSelected.y) <= 1;
                const nbAdvAround = tileSelected && tile.x === tileSelected.x && tile.y === tileSelected.y ? 
                    [...state.futGame.tiles].filter(
                    tile => tileSelected && tile.team?.type === TeamType.CPU && Math.abs(tile.x - tileSelected.x) <= 1 && Math.abs(tile.y - tileSelected.y) <= 1
                    ).length : undefined;
                return {...tile, isHighlighted: isHighlightedAndEnabled, isDisabled: !isHighlightedAndEnabled, nbAdvAround: nbAdvAround}});
            
            state.futGame = {
                ...state.futGame,
                tiles: tilesUpdated,
                action: FutActionEnum.PASS
            };
        },
        possibleDribbleAction(state) {
            state.futGame = {
                ...state.futGame,
                action: FutActionEnum.DRIBBLE
            };
        },
        possibleShootAction(state) {
            state.futGame = {
                ...state.futGame,
                action: FutActionEnum.SHOOT
            };
        },
        possibleMoveAction(state) {
            state.futGame = {
                ...state.futGame,
                action: FutActionEnum.MOVE_ANOTHER_PLAYER
            };
        }         
    }
});

export const { startGame, modifyFutTile, possiblePassAction, possibleDribbleAction, possibleShootAction, possibleMoveAction } = futSlice.actions;
export default futSlice.reducer;
