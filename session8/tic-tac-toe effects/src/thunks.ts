import { Game, otherPlayer, Player } from "./model";
import { Thunk, shortPollingThunk } from "./thunklib"
import { Dispatch, GetState, MakeMovePayload, lobbySlice, gameSlice } from "./store"
import * as api from "./api";

export const pollGamesThunk = shortPollingThunk<Game[]>({
    intervalMs: 250,
    polling: api.readGamesList,
    actionCreator: lobbySlice.actions.init
})


export function initThunk(dispatch: Dispatch, _: GetState) {
    api.readGamesList()
        .then(lobbySlice.actions.init)
        .then(dispatch)
        .catch(console.error)
}

export function pollForOtherPlayerThunk(game: Game): Thunk {
    return shortPollingThunk<Game>({
        intervalMs: 100,
        polling: () => api.readGame(game.gameNumber),
        actionCreator(game: Game, getState: GetState) {
            if (game.ongoing) 
                return gameSlice.actions.setGame({player: getState().game.player, game})
        }
    })
}

export function newGameThunk(name?: string) {
    return async function(dispatch: Dispatch, _: GetState) {
        api.createGame(name)
            .then(game => ({player: 'X', game}))
            .then(gameSlice.actions.newGame)
            .then(dispatch)
            .catch(console.error)
        }
}

export function pollForMove(gameNumber: number, expectedPlayer: Player) {
    return shortPollingThunk<MakeMovePayload>({
        intervalMs: 100,
        async polling(): Promise<MakeMovePayload> {
            const { moves, inTurn, winState, stalemate } = await api.readMoves(gameNumber)
            return { move: moves[moves.length - 1], inTurn, winState, stalemate }
        },
        actionCreator(m: MakeMovePayload) {
            if (m.inTurn === expectedPlayer)
                return gameSlice.actions.makeMove(m)
        }
    })
}

export function joinGameThunk(gameNumber: number): Thunk {
    return async function(dispatch: Dispatch, _: GetState) {
        api.joinGame(gameNumber)
            .then(game => ({player: 'O', game}))
            .then(gameSlice.actions.setGame)
            .then(dispatch)
            .catch(console.error)
        }
}

export function makeMoveThunk(x: number, y: number): Thunk {
    return async function(dispatch: Dispatch, getState: GetState) {
        const state = getState()
        const {mode, game, player} = state.game
        if (mode === 'playing') {
            api.createMove(game.gameNumber, {x, y, player})
                .then(gameSlice.actions.makeMove)
                .then(dispatch)
                .catch(console.error)
            }
    }
}


export async function concedeThunk(dispatch: Dispatch, getState: GetState) {
    const state = getState()
    const {mode, player, game: {gameNumber}} = state.game
    if (mode === 'playing') {
        api.concede(gameNumber, otherPlayer(player))
            .then(game => ({player, game}))
            .then(gameSlice.actions.setGame)
            .then(dispatch)
            .catch(console.error)
        }
}
