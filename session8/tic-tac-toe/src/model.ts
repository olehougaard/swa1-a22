export type Player = 'X' | 'O'
export type Board = ('X' | 'O' | '')[][]
export type Game = {
    gameNumber: number,
    board: Board,
    ongoing: boolean,
    inTurn: Player,
    winState?: {winner: Player, row?: any},
    stalemate: boolean
}

export type Move = {
    conceded?: boolean
    x?: number,
    y?: number,
    player: Player
}

export type GameState = 
    { mode: 'playing' | 'waiting' | 'no game', player?: Player, game?: Game} 

function set<T>(xs: T[], i: number, e: T): T[] {
    return xs.map((x, inx) => inx === i? e : x)
}

export function otherPlayer(p: Player): Player {
    switch(p) {
        case 'X': return 'O'
        case 'O': return 'X'
    }
}

export const emptyGameState: GameState = { mode: 'no game' }

export function applyMove(board: Board, {x, y, player}: Move): Board {
    if (x === undefined || y === undefined)
        return board
    else 
        return set(board, x, set(board[x], y, player))
    
}
