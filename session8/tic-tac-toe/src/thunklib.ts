import { Action } from "@reduxjs/toolkit";
import { Dispatch, GetState } from "./store";

export type Thunk = (dispatch: Dispatch, getState: GetState) => Promise<void>

export type PollingOptions<T> = {
    intervalMs: number,
    polling: () => Promise<T>,
    actionCreator: (_:T) => (Action | undefined),
    errorCreator?: (_:any) => (Action | undefined)
}

export type ContinuousPollingOptions<T> = PollingOptions<T> & { cont?: (_:T) => boolean }

export function continuousPollingThunk<T>({intervalMs, polling, actionCreator, errorCreator = _ => undefined, cont = _ => true}: ContinuousPollingOptions<T>): Thunk {
    return async function(dispatch: Dispatch, _: GetState) {
        async function loop() {
            try {
                let t: T = await polling()
                let action = actionCreator(t)
                if (action !== undefined) 
                    dispatch(action)
                if (cont(t)) 
                    setTimeout(loop, intervalMs)
            } catch (e: any) {
                let errorAction = errorCreator(e)
                if (errorAction !== undefined)
                    dispatch(errorAction)
            }
        }
        loop()
    }
}

export function shortPollingThunk<T>(options: PollingOptions<T>): Thunk {
    return continuousPollingThunk({...options, cont: t => options.actionCreator(t) === undefined})
}

