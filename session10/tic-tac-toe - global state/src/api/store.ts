import {reactive} from 'vue'
import type {Game, GameState, Move, Player} from '@/api/model'

export type Model = {
    games: Game[],
    readonly gameState: Readonly<GameState>,
    readonly game?: Game,
    readonly player?: Player,
    endGame(): void,
    waitForPlayer(waitingPlayer: Player, game: Game): void,
    startGame(player: Player, game: Game): void,
    makeMove(m: Move): void,
    applyGameProperties(props: Partial<Game>): void,
}

export const model: Model = reactive({
    games: [] as Game[], 
    gameState: {mode: 'no game'} as GameState,
    get game(): Game | undefined {
        if (this.gameState.mode !== 'no game')
            return this.gameState.game
    },
    get player(): Player | undefined {
        if (this.gameState.mode !== 'no game')
            return this.gameState.player
    },
    endGame() {
        this.gameState.mode = 'no game'
    },
    waitForPlayer(waitingPlayer: Player, game: Game) {
        this.gameState = {mode: 'waiting', player: waitingPlayer, game}
    },
    startGame(player: Player, game: Game) {
        this.gameState = {mode: 'playing', player, game}
    },
    makeMove(m: Move) {
        if (this.gameState.mode !== 'no game') {
            this.gameState.game.board[m.y][m.x] = m.player
        }
    },
    applyGameProperties(props: Partial<Game>) {
        if (this.gameState.mode !== 'no game') {
            this.gameState.game = {...this.gameState.game, ...props}
        }
    }
})
