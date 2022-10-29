import { configureStore, createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
import { apply_move, Move, Player, GameState, Game, empty_game_state } from './model'

type MakeMovePayload = {
    move: Move,
    inTurn: Player,
    winner?: Player,
    stalemate: boolean
}

type GamePayload = {
    player: Player,
    game: Game
}

const gameReducers = {
    makeMove(state: GameState, action: PayloadAction<MakeMovePayload>): GameState {
        const {move, ...props} = action.payload
        if (state.mode === 'playing') {
            return {...state, game: { ...state.game, board: apply_move(state.game.board, move), ...props}}
        } else
            return state
    },
    newGame(_: GameState, action: PayloadAction<GamePayload>): GameState {
        const { player, game } = action.payload
        return {mode: 'waiting', player, game}
    },
    startGame(_: GameState, action: PayloadAction<GamePayload>): GameState {
        const { player, game } = action.payload
        return {mode: 'playing', player, game}
    }
} 

export const gameSlice = createSlice<GameState, typeof gameReducers>({
    name: 'game',
    initialState: empty_game_state,
    reducers: gameReducers
})

const lobbyReducers = {
    init(_: Game[], action: PayloadAction<Game[]>): Game[] {
        return action.payload
    },
    newGame(state: Game[], action: PayloadAction<Game>): Game[] {
        const game = action.payload
        return [...state, game]
    },
    joinGame(state: Game[], action: PayloadAction<Game>): Game[] {
        const { gameNumber } = action.payload
        return state.filter(g => g.gameNumber !== gameNumber)
    }
}

export const lobbySlice = createSlice({
    name: 'lobby',
    initialState: [] as Game[],
    reducers: lobbyReducers
})

export type State = { lobby: Game[], game: GameState }

export const store = configureStore<State>({
    reducer: { game: gameSlice.reducer, lobby: lobbySlice.reducer}
})

export type StoreType = typeof store
export type Dispatch = StoreType['dispatch']
export type GetState = StoreType['getState']
export type Subscriber = Parameters<StoreType['subscribe']>[0]