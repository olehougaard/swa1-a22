export type Player = 'X' | 'O'
export type Board = ('X' | 'O' | null)[][]
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
    x: number,
    y: number,
    player: Player
}

export type GameState = 
    {mode: 'playing' | 'waiting', player: Player, game: Game} | {mode: 'no game' } 

export const otherPlayer = (p: Player): Player => {
    switch(p) {
        case 'X': return 'O'
        case 'O': return 'X'
    }
}

