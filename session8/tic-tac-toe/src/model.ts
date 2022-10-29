export type Player = 'X' | 'O'
export type Board = ('X' | 'O' | undefined)[][]
export type Game = {
    gameNumber: number,
    board: Board,
    ongoing: boolean,
    inTurn: Player,
    winner?: Player,
    stalemate: boolean
}

export type Move = {
    x: number,
    y: number,
    player: Player
}

export type GameState = 
    { mode: 'playing', player: Player, game: Game} 
  | { mode: 'waiting', player: Player, game: Game} 
  | { mode: 'no game' }

function set<T>(xs: T[], i: number, e: T): T[] {
    return xs.map((x, inx) => inx === i? e : x)
}

export const empty_game_state: GameState = { mode: 'no game' }

export function apply_move(board: Board, {x, y, player}: Move): Board {
    if (x === undefined || y === undefined)
        return board
    else 
        return set(board, x, set(board[x], y, player))
    
}
