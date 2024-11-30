import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shoot, pass, moveAnotherPlayer, dribble } from '../../../../redux/slices/futSlices';
import { RootState } from '../../../../redux/store';
import { FutActionEnum } from '../../../../models/fut/FutActionEnum';
import { FutTile } from '../../../../models/fut/FutTile';
import { FutGame } from '../../../../models/fut/FutGame';

const FutActionButton = ({ tile }: {tile: FutTile}) => {
    const dispatch = useDispatch();
    const futGame: FutGame = useSelector((state: RootState) => state.fut.futGame);

    const handleAction = () => {
        if (!futGame.action) {
            console.warn('No action selected!');
            return;
        }

        switch (futGame.action) {
            case FutActionEnum.SHOOT:
                dispatch(shoot({ tile }));
                break;
            case FutActionEnum.PASS:
                dispatch(pass({ tile }));
                break;
            case FutActionEnum.MOVE_ANOTHER_PLAYER:
                dispatch(moveAnotherPlayer({ tile }));
                break;
            case FutActionEnum.DRIBBLE:
                dispatch(dribble({ tile }));
                break;
            default:
                console.error(`Unknown action: ${futGame.action}`);
        }
    };

    return <button key={`x${tile.x}y${tile.y}`} 
                    onClick={handleAction}
                    className={`fut-tile ${tile.cssClass} ${tile.isHighlighted ? 'fut-tile__highlighted' : ''}`}
                    style={{
                        border: tile.isHasBall && futGame.isMyTurn && !futGame.isActionFinished ? '5px solid #F9F300' : '',
                    }}
                    disabled={tile.isDisabled}>
            {tile.isRevealed && tile.team && tile.team.type} {tile.isHasBall && "/@"}
            {tile.nbAdvAround && <span>{tile.nbAdvAround}</span>}
        </button>;
};

export default FutActionButton;
