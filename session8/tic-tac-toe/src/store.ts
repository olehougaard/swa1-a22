import { AnyAction, configureStore, createSlice, EnhancedStore, Store, ThunkMiddleware } from '@reduxjs/toolkit'
import { game_state, apply_move, Move, Player, GameState, Game, empty_game_state } from './model'

type MakeMovePayload = {
    moves: Move[],
    inTurn: Player,
    winner?: Player,
    stalemate: boolean
}

type ResetPayload = {
    player: Player,
    game: Game
}

type Action = {
    type: string,
    payload?: any
}

const gameReducers = {
    makeMoves(state: GameState, action: Action): GameState {
        const {moves, inTurn, winner, stalemate}: MakeMovePayload = action.payload
        if (state.playing) {
            const { player, game } = state
            return game_state(player, { ...moves.reduce(apply_move, game), inTurn, winner, stalemate})
        } else
            return state
    },
    reset(_: GameState, action: Action): GameState {
        const { player, game } = action.payload
        return game_state(player, game)
    }
} 

const gameSlice = createSlice<GameState, typeof gameReducers>({
    name: 'game',
    initialState: empty_game_state,
    reducers: gameReducers
})

const lobbyReducers = {
    init(_: Game[], action: Action): Game[] {
        return action.payload
    },
    newGame(state: Game[], action: Action): Game[] {
        const game: Game = action.payload
        return [...state, game]
    },
    joinGame(state: Game[], action: Action): Game[] {
        const { gameNumber }: Game = action.payload
        return state.filter(g => g.gameNumber !== gameNumber)
    }
}

const lobbySlice = createSlice({
    name: 'lobby',
    initialState: [] as Game[],
    reducers: lobbyReducers
})

export type State = { lobby: Game[], game: GameState }

export const store = configureStore<State>({
    reducer: { game: gameSlice.reducer, lobby: lobbySlice.reducer}
})
