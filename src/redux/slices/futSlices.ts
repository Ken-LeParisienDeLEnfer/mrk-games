import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FutGame } from '../../models/fut/FutGame';
import { FutActionEnum } from '../../models/fut/FutActionEnum';
import { FutTeam } from '../../models/fut/FutTeam';
import { TeamType } from '../../models/TeamType';
import { FutTile } from '../../models/fut/FutTile';
import { toNamespacedPath } from 'path';

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
                        isDisabled: false,
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
            const tileSelected = [...state.futGame.tiles].find(tile => tile.team && tile.team.type === TeamType.USER && tile.isHasBall);
            

            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((tile: FutTile) => { 
                const isHighlightedAndEnabled = tileSelected !== undefined && tile.team?.type !== TeamType.USER && !tile.isHasBall && Math.abs(tile.x - tileSelected.x) <= 1 && Math.abs(tile.y - tileSelected.y) <= 1;
                const nbAdvAround = tileSelected && tile.x === tileSelected.x && tile.y === tileSelected.y ? 
                    [...state.futGame.tiles].filter(
                    tile => tileSelected && tile.team?.type === TeamType.CPU && Math.abs(tile.x - tileSelected.x) <= 1 && Math.abs(tile.y - tileSelected.y) <= 1
                    ).length : undefined;
                return {...tile, isHighlighted: isHighlightedAndEnabled, isDisabled: !isHighlightedAndEnabled, nbAdvAround: nbAdvAround}});
            
            state.futGame = {
                ...state.futGame,
                tiles: tilesUpdated,
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
        },
        pass(state, action: PayloadAction<{ tile: FutTile }>) {
            let isGameFinished: boolean = false;
            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((t: FutTile) => {
                if(t.team && t.team.type === TeamType.USER && t.isHasBall) {
                    return {
                        ...t,
                        isDisabled: false,
                        nbAdvAround: undefined,
                        isHasBall: false
                    }
                } else if (action.payload.tile.x === t.x && action.payload.tile.y === t.y) {
                    const nbAdvAround: number = [...state.futGame.tiles].filter(
                        tile => tile.team?.type === TeamType.CPU && Math.abs(tile.x - t.x) <= 1 && Math.abs(tile.y - t.y) <= 1
                        ).length;
                    isGameFinished = nbAdvAround > 1;
                    return {
                        ...t,
                        isHasBall: true,
                        nbAdvAround: nbAdvAround
                    }
                }
                return t
            });

            state.futGame = {
                ...state.futGame,
                isFinished: isGameFinished,
                isActionFinished: true,
                tiles: tilesUpdated,
            }
        },
        dribble(state, action: PayloadAction<{ tile: FutTile }>) {
            let isGameFinished: boolean = false;
            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((t: FutTile) => {
                if(t.team && t.team.type === TeamType.USER && t.isHasBall) {
                    return {
                        ...t,
                        isDisabled: true,
                        nbAdvAround: undefined,
                        isHasBall: false,
                        isHighlighted: false,
                        team: null
                    }
                } else if (action.payload.tile.x === t.x && action.payload.tile.y === t.y) {
                    isGameFinished = t.team !== undefined && t.team?.type === TeamType.CPU;
                    const nbAdvAround: number | undefined = isGameFinished ? undefined : [...state.futGame.tiles].filter(
                        tile => tile.team?.type === TeamType.CPU && Math.abs(tile.x - t.x) <= 1 && Math.abs(tile.y - t.y) <= 1
                        ).length;
                    return {
                        ...t,
                        isHasBall: true,
                        isRevealed: true,
                        nbAdvAround: nbAdvAround,
                        team: isGameFinished ? t.team : new FutTeam(TeamType.USER)
                    }
                } else if (t.isHighlighted) {
                    return {
                        ...t,
                        isDisabled: true,
                        isHighlighted: false
                    }
                }
                return t
            });

            state.futGame = {
                ...state.futGame,
                isFinished: isGameFinished,
                isActionFinished: true,
                tiles: tilesUpdated,
            }
        },
        moveAnotherPlayer(state, action: PayloadAction<{ tile: FutTile }>) {
            
        },
        shoot(state, action: PayloadAction<{ tile: FutTile }>) {
            
        },
        nextAction(state) {
            state.futGame = {
                ...state.futGame,
                action: FutActionEnum.NONE,
                isActionFinished: true
            }
        }
    }
});

export const { 
    startGame, 
    possiblePassAction, 
    possibleDribbleAction, 
    possibleShootAction, 
    possibleMoveAction, 
    pass, 
    dribble, 
    moveAnotherPlayer, 
    shoot, 
    nextAction
 } = futSlice.actions;
export default futSlice.reducer;
