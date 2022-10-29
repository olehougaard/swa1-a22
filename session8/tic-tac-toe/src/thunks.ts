import { Game, Move, Player } from "./model";
import { Thunk, continuousPollingThunk, shortPollingThunk } from "./thunklib"
import { Dispatch, GetState, MakeMovePayload, lobbySlice, gameSlice } from "./store"

async function readGamesList(): Promise<Game[]> {
    const response = await fetch(`http://localhost:8080/games/`)
    if (response.ok) {
        const games: Game[] = await response.json()
        return games
    } else {
        return Promise.reject<Game[]>(response.statusText)
    }
}

export function pollGamesThunk(intervalMs: number): Thunk {
    return continuousPollingThunk<Game[]>({
        intervalMs,
        polling: readGamesList,
        actionCreator: lobbySlice.actions.init
    })
}

export function initThunk(dispatch: Dispatch, _: GetState) {
    readGamesList()
        .then(lobbySlice.actions.init)
        .then(dispatch)
        .catch(console.log)
}

function waitForGameThunk(game: Game): Thunk {
    return shortPollingThunk<Game>({
        intervalMs: 100,
        async polling() {
            const response = await fetch(`http://localhost:8080/games/${game.gameNumber}`)
            if (response.ok)
                return response.json()
            else
                return Promise.reject<Game>(response.statusText)
        },
        actionCreator(game: Game) {
            if (game.ongoing) 
                return gameSlice.actions.startGame({player: 'X', game})
        }
    })
}

export async function newGameThunk(dispatch: Dispatch, _: GetState) {
    const response = await fetch('http://localhost:8080/games', { method: 'POST', headers: { 'Accept': 'application/json'} })
    if (response.ok) {
        const game = await response.json()
        dispatch(gameSlice.actions.newGame(game)) // createNewGameAction(game))
        dispatch(waitForGameThunk(game))
    }
}

export function waitForMove(game: Game, expectedPlayer: Player) {
    return shortPollingThunk<MakeMovePayload>({
        intervalMs: 100,
        async polling(): Promise<MakeMovePayload> {
            const response = await fetch(`http://localhost:8080/games/${game.gameNumber}/moves`)
            if (response.ok) {
                const { moves, inTurn, winner, stalemate }: { moves: Move[], inTurn: Player, winner: any, stalemate: any } = await response.json()
                return { move: moves[moves.length - 1], inTurn, winner, stalemate }
            } else {
                return Promise.reject<MakeMovePayload>(response.statusText)
            }
                    },
        actionCreator(m: MakeMovePayload) {
            if (m.inTurn === expectedPlayer)
                return gameSlice.actions.makeMove(m)
        }
    })
}

export function joinGameThunk(gameNumber: number): Thunk {
    return async function(dispatch: Dispatch, _: GetState) {
        const response = await fetch(`http://localhost:8080/games/${gameNumber}`, { method: 'PATCH', body: JSON.stringify({ongoing: true}), headers : { 'Content-Type': 'application/json', Accept: 'application/json' }})
        if (response.ok) {
            const game = await response.json()
            dispatch(gameSlice.actions.startGame({player: 'O', game}))
            dispatch(waitForMove(game, 'O'))
        }
    }
}

export function makeMoveThunk(x: number, y: number): Thunk {
    return async function(dispatch: Dispatch, getState: GetState) {
        const state = getState()
        const gameState = state.game
        if (gameState.mode === 'playing') {
            const response = await fetch(
                `http://localhost:8080/games/${gameState.game.gameNumber}/moves`, 
                { method: 'POST', body: JSON.stringify({x, y, inTurn: gameState.player}), headers : { 'Content-Type': 'application/json', Accept: 'application/json' }})
            if (response.ok) {
                response.json()
                .then(gameSlice.actions.makeMove)
                .then(dispatch)
                dispatch(waitForMove(gameState.game, gameState.player))
            }
        }
    }
}
