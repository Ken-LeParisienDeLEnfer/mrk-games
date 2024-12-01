import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FutGame } from '../../models/fut/FutGame';
import { FutActionEnum } from '../../models/fut/FutActionEnum';
import { FutTeam } from '../../models/fut/FutTeam';
import { TeamTypeEnum } from '../../models/TeamTypeEnum';
import { FutTile } from '../../models/fut/FutTile';
import { FutTileTypeEnum } from '../../models/fut/FutTileTypeEnum';
import { ResultEnum } from '../../models/ResultEnum';
import { getTrajectory } from '../../utils/futUtils';

const initialState = {
    futGame: new FutGame(1),
};

const futSlice = createSlice({
    name: 'futGame',
    initialState,
    reducers: {
        startGame(state) {
            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((t: FutTile) => {
                if(t.team && t.team.type === TeamTypeEnum.USER && t.isHasBall) {
                    return {
                        ...t,
                        isDisabled: false,
                        nbAdvAround: 
                        [...state.futGame.tiles].filter(
                        tile => tile.team?.type === TeamTypeEnum.CPU && Math.abs(tile.x - t.x) <= 1 && Math.abs(tile.y - t.y) <= 1
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
            const tileSelected = [...state.futGame.tiles].find(tile => tile.team && tile.team.type === TeamTypeEnum.USER && tile.isHasBall);
            

            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((tile: FutTile) => { 
                const isHighlightedAndEnabled = tileSelected !== undefined && tile.team?.type === TeamTypeEnum.USER && !tile.isHasBall && ((Math.abs(tile.x - tileSelected.x) <= 1 && Math.abs(tile.y - tileSelected.y) <= 1) || (tile.x + tile.y === tileSelected.x + tileSelected.y) || (tile.x - tile.y === tileSelected.x - tileSelected.y));
                const nbAdvAround = tileSelected && tile.x === tileSelected.x && tile.y === tileSelected.y ? 
                    [...state.futGame.tiles].filter(
                    tile => tileSelected && tile.team?.type === TeamTypeEnum.CPU && Math.abs(tile.x - tileSelected.x) <= 1 && Math.abs(tile.y - tileSelected.y) <= 1
                    ).length : undefined;
                return {...tile, isHighlighted: isHighlightedAndEnabled, isDisabled: !isHighlightedAndEnabled, nbAdvAround: nbAdvAround}});
            
            state.futGame = {
                ...state.futGame,
                tiles: tilesUpdated,
                action: FutActionEnum.PASS
            };
        },
        possibleDribbleAction(state) {
            const tileSelected: FutTile | undefined = [...state.futGame.tiles].find(tile => tile.team && tile.team.type === TeamTypeEnum.USER && tile.isHasBall);
            

            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((tile: FutTile) => { 
                const isHighlightedAndEnabled = tileSelected !== undefined && tile.team?.type !== TeamTypeEnum.USER && !tile.isHasBall && Math.abs(tile.x - tileSelected.x) <= 1 && Math.abs(tile.y - tileSelected.y) <= 1;
                const nbAdvAround = tileSelected && tile.x === tileSelected.x && tile.y === tileSelected.y ? 
                    [...state.futGame.tiles].filter(
                    tile => tileSelected && tile.team?.type === TeamTypeEnum.CPU && Math.abs(tile.x - tileSelected.x) <= 1 && Math.abs(tile.y - tileSelected.y) <= 1
                    ).length : undefined;
                return {...tile, isHighlighted: isHighlightedAndEnabled, isDisabled: !isHighlightedAndEnabled, nbAdvAround: nbAdvAround}});
            
            state.futGame = {
                ...state.futGame,
                tiles: tilesUpdated,
                action: FutActionEnum.DRIBBLE
            };
        },
        possibleShootAction(state) {
            const tileSelected: FutTile | undefined = [...state.futGame.tiles].find(tile => tile.team && tile.team.type === TeamTypeEnum.USER && tile.isHasBall);
            if(tileSelected) {
                const isCanShootForward : boolean = [...state.futGame.tiles].find(tile => tileSelected && tile.y === 0 && tile.x === tileSelected.x && tile?.type === FutTileTypeEnum.GOAL) !== undefined;
                let isCanShootDiagRight: boolean = false;
                let y: number = tileSelected?.y;
                let x: number = tileSelected?.x;
                while (y >= 0 && isCanShootDiagRight === false) {
                    const isGoalTile: FutTile | undefined = [...state.futGame.tiles].find(tile => tile.x === x + 1 && tile.y === y-1 && tile.type === FutTileTypeEnum.GOAL);
                    if(isGoalTile !== undefined) {
                        isCanShootDiagRight = true;
                    }
                    y--;
                    x++;
                }
                y = tileSelected?.y;
                x = tileSelected?.x;
                let isCanShootDiagLeft: boolean = false;
                while ((y >= 0 && x>=0) && isCanShootDiagLeft === false) {
                    const isGoalTile: FutTile | undefined = [...state.futGame.tiles].find(tile => tile.x === x - 1 && tile.y === y-1 && tile.type === FutTileTypeEnum.GOAL);
                    if(isGoalTile !== undefined) {
                        isCanShootDiagLeft = true;
                    }
                    y--;
                    x--;
                }
                y = tileSelected?.y;
                x = tileSelected?.x;
                let tilesUpdated: FutTile[] | null = null;
                    tilesUpdated = [...state.futGame.tiles].map(tile => {
                        if(isCanShootDiagRight && tile.x > x && tile.y < y && (tile.x + tile.y === x + y)) {
                            return {
                                ...tile,
                                isHighlighted: true,
                                isDisabled: tile.y !== 0
                            }
                        } 
                        
                        if (isCanShootForward && tile.x === x && tile.y < y) {
                            return {
                                ...tile,
                                isHighlighted: true,
                                isDisabled: tile.y !== 0
                            }

                        } 
                        if (isCanShootDiagLeft && tile.x < x && tile.y < y && (tile.x - tile.y === x - y)) {
                            return {
                                ...tile,
                                isHighlighted: true,
                                isDisabled: tile.y !== 0
                            }
                        }
                        if (tile.isHighlighted) {
                            return {
                                ...tile,
                                isHighlighted: false,
                                isDisabled: false
                            }
                        }
                        return tile;
                    })
                state.futGame = {
                    ...state.futGame,
                    tiles: tilesUpdated,
                    action: FutActionEnum.SHOOT
                };
            }
            
        },
        possibleMoveAction(state) {
            state.futGame = {
                ...state.futGame,
                action: FutActionEnum.MOVE_ANOTHER_PLAYER
            };
        },
        pass(state, action: PayloadAction<{ tile: FutTile }>) {
            let isGameFinished: boolean = false;
            const tileWithBall = [...state.futGame.tiles].find(t => t.isHasBall);
            const trajectoryOfTheBall = getTrajectory(tileWithBall, action.payload.tile);
            const tileAdvOnPassTrajectory = trajectoryOfTheBall.find((point) =>
                [...state.futGame.tiles].some(
                    (tile) =>
                        tile.team && tile.team.type === TeamTypeEnum.CPU &&
                        tile.x === point.x &&
                        tile.y === point.y
                )
            );
            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((t: FutTile) => {
                if(t.team && t.team.type === TeamTypeEnum.USER && t.isHasBall) {
                    return {
                        ...t,
                        isDisabled: true,
                        nbAdvAround: undefined,
                        isHighlighted: false,
                        isHasBall: false,
                    }
                } else if (tileAdvOnPassTrajectory && tileAdvOnPassTrajectory.x === t.x && tileAdvOnPassTrajectory.y === t.y) {
                    isGameFinished = true;
                    return {
                        ...t,
                        isHasBall: true,
                        isDisabled: true,
                    }
                } else if (action.payload.tile.x === t.x && action.payload.tile.y === t.y) {
                    const nbAdvAround: number = [...state.futGame.tiles].filter(
                        tile => tile.team?.type === TeamTypeEnum.CPU && Math.abs(tile.x - t.x) <= 1 && Math.abs(tile.y - t.y) <= 1
                        ).length;
                    isGameFinished = nbAdvAround > 1;
                    return {
                        ...t,
                        isHasBall: tileAdvOnPassTrajectory === undefined,
                        isHighlighted: tileAdvOnPassTrajectory === undefined,
                        nbAdvAround: tileAdvOnPassTrajectory === undefined ? nbAdvAround : undefined,
                        isDisabled: true,
                    }
                } else if (t.isDisabled || t.isHighlighted) {
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
                result: isGameFinished ? ResultEnum.L : undefined,
                isActionFinished: true,
                tiles: tilesUpdated,
            }
        },
        dribble(state, action: PayloadAction<{ tile: FutTile }>) {
            let isGameFinished: boolean = false;
            const tilesUpdated: FutTile[] = [...state.futGame.tiles].map((t: FutTile) => {
                if(t.team && t.team.type === TeamTypeEnum.USER && t.isHasBall) {
                    return {
                        ...t,
                        isDisabled: true,
                        nbAdvAround: undefined,
                        isHasBall: false,
                        isHighlighted: false,
                        team: null
                    }
                } else if (action.payload.tile.x === t.x && action.payload.tile.y === t.y) {
                    isGameFinished = t.team !== undefined && t.team?.type === TeamTypeEnum.CPU;
                    const nbAdvAround: number | undefined = isGameFinished ? undefined : [...state.futGame.tiles].filter(
                        tile => tile.team?.type === TeamTypeEnum.CPU && Math.abs(tile.x - t.x) <= 1 && Math.abs(tile.y - t.y) <= 1
                        ).length;
                    return {
                        ...t,
                        isHasBall: true,
                        isRevealed: true,
                        nbAdvAround: nbAdvAround,
                        team: isGameFinished ? t.team : new FutTeam(TeamTypeEnum.USER)
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
            const isGoalSave = [...state.futGame.tiles].find(t => t.x === action.payload.tile.x && t.y === action.payload.tile.y && t.type === FutTileTypeEnum.GOAL && t.team && t.team.type === TeamTypeEnum.CPU ) !== undefined;
            state.futGame = {
                ...state.futGame,
                isFinished: true,
                isActionFinished: true,
                result: isGoalSave ? ResultEnum.L : ResultEnum.W 
            }
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
