import { Game, otherPlayer, Player } from "./model";
import { Thunk, continuousPollingThunk, shortPollingThunk } from "./thunklib"
import { Dispatch, GetState, MakeMovePayload, lobbySlice, gameSlice } from "./store"
import * as api from "./api";

export function pollGamesThunk(intervalMs: number): Thunk {
    return continuousPollingThunk<Game[]>({
        intervalMs,
        polling: api.readGamesList,
        actionCreator: lobbySlice.actions.init
    })
}

export function initThunk(dispatch: Dispatch, _: GetState) {
    api.readGamesList()
        .then(lobbySlice.actions.init)
        .then(dispatch)
        .catch(console.log)
}

function pollForOtherPlayerThunk(game: Game): Thunk {
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
        const game = await api.createGame(name)
        dispatch(gameSlice.actions.newGame({player: 'X', game}))
        dispatch(pollForOtherPlayerThunk(game))
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
        const game: Game = await api.joinGame(gameNumber)
        dispatch(gameSlice.actions.setGame({player: 'O', game}))
        dispatch(pollForMove(game.gameNumber, 'O'))
    }
}

export function makeMoveThunk(x: number, y: number): Thunk {
    return async function(dispatch: Dispatch, getState: GetState) {
        const state = getState()
        const {mode, game, player} = state.game
        if (mode === 'playing') {
            const payload = await api.createMove(game.gameNumber, {x, y, player})
            dispatch(gameSlice.actions.makeMove(payload))
            dispatch(pollForMove(game.gameNumber, player))
        }
    }
}


export async function concedeThunk(dispatch: Dispatch, getState: GetState) {
    const state = getState()
    const {mode, player, game: {gameNumber}} = state.game
    if (mode === 'playing') {
        const game = await api.concede(gameNumber, otherPlayer(player))
        dispatch(gameSlice.actions.setGame({player, game}))
    }
}
