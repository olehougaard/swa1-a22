import { Action } from "@reduxjs/toolkit";
import { Dispatch, GetState } from "./store";

export type Thunk = (dispatch: Dispatch, getState: GetState) => Promise<void>

export type PollingOptions<T> = {
    intervalMs: number,
    polling: (gs: GetState) => Promise<T>,
    actionCreator: (_:T, gs: GetState) => (Action | undefined),
    errorCreator?: (_:any, gs: GetState) => (Action | undefined)
}

export type ContinuousPollingOptions<T> = PollingOptions<T> & { cont?: (_:T, gs: GetState) => boolean }

export function continuousPollingThunk<T>({intervalMs, polling, actionCreator, errorCreator = _ => undefined, cont = _ => true}: ContinuousPollingOptions<T>): Thunk {
    return async function(dispatch: Dispatch, getState: GetState) {
        async function loop() {
            try {
                let t: T = await polling(getState)
                let action = actionCreator(t, getState)
                if (action !== undefined) 
                    dispatch(action)
                if (cont(t, getState)) 
                    setTimeout(loop, intervalMs)
            } catch (e: any) {
                let errorAction = errorCreator(e, getState)
                if (errorAction !== undefined)
                    dispatch(errorAction)
            }
        }
        loop()
    }
}

export function shortPollingThunk<T>(options: PollingOptions<T>): Thunk {
    return continuousPollingThunk({...options, cont: (t, gs) => options.actionCreator(t, gs) === undefined})
}

