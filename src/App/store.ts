import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    app: () =>({initial: ''})
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;


export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
// @ts-ignore
window.store = store;