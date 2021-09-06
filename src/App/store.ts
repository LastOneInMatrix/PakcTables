import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {AppActionType, appReducer} from "./appReducer";
import {LoginActionType, loginReducer} from "../Components/Login/loginReduser";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type CommonActionTypeForApp = AppActionType | LoginActionType

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
// @ts-ignore
window.store = store;