export type Player = string
export type Game = {
    gameNumber: number,
    board: string[][],
    inTurn: Player,
    winner?: Player,
    stalemate: boolean
}

export type Move = {
    x: number,
    y: number,
    player: Player
}

export type GameState = { playing: true, player: Player, game: Game} | { playing: false }

export const empty_game_state: GameState = { playing: false }

export function game_state(player: Player, game: Game): GameState {
    return { playing: true, player, game }
}

export function apply_move(game: Game, {x, y, player}: Move): Game {
    if (x === undefined || y === undefined)
        return game
    else {
        return {...game, board: {...game.board, [x]: {...game.board[x], [y]: player}}}
    }
}
