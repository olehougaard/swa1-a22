import { Store } from "@reduxjs/toolkit";
import { Game } from "./model";
import { State } from "./store";

type Dispatch = Store<State>['dispatch']
type GetState = Store<State>['getState']

export async function initThunk(dispatch: Store<State>['dispatch'], getState: GetState) {
    const response = await fetch(`http://localhost:8080/games/`)
    if (response.ok) {
        const games: Game[] = await response.json()
        dispatch({type: 'lobby/init', payload: games})
    }
}
