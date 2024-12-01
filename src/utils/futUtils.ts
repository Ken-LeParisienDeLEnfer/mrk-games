import { FutTile } from "../models/fut/FutTile";

export const getTrajectory = (tileWithBall: FutTile | undefined, targetTile: FutTile): {x: number, y: number}[] => {
    if(tileWithBall === undefined) {
        return [];
    }

    const trajectory = [];
    const dx = Math.sign(targetTile.x - tileWithBall.x);
    const dy = Math.sign(targetTile.y - tileWithBall.y);

    let current = { x: tileWithBall.x, y: tileWithBall.y };
    while (current.x !== targetTile.x || current.y !== targetTile.y) {
        current = { x: current.x + dx, y: current.y + dy };
        trajectory.push({ ...current });
    }

    return trajectory;
};