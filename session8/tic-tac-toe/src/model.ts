export type Player = 'X' | 'O'
export type Board = ('X' | 'O' | '')[][]
export type Game = {
    gameNumber: number,
    gameName: string,
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

const set = <T>(xs: T[], i: number, e: T): T[] => xs.map((x, inx) => inx === i? e : x)

export const otherPlayer = (p: Player): Player => {
    switch(p) {
        case 'X': return 'O'
        case 'O': return 'X'
    }
}

export const emptyGameState: GameState = { mode: 'no game' }

const applyMoveBoard = (board: Board, {x, y, player}: Move): Board => {
    if (x === undefined || y === undefined)
        return board
    else 
        return set(board, x, set(board[x], y, player))
}

const applyMoveGame = (game: Game, move: Move): Game => ({ ...game, board: applyMoveBoard(game.board, move) })

export function makeMove(state: GameState, move: Move, props: Partial<Game>): GameState {
    if (state.mode === 'playing')
        return { ...state, game: {...applyMoveGame(state.game, move), ...props} }
    else
        return state

}
