import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {page404Reduser} from "../components/v5-Page_404/pag404Reduser";
import {LoginActionType, loginReducer} from "../components/v2-Login/loginReduser";
import {AppActionType, appReducer} from "./appReducer";
import {PackActionType, packReducer} from "../components/v8-PacksPage/packReduser";
import {
    PaginationActionPackType,
    paginationPackReducer
} from "../components/common/Pagination/paginationPackReduser";
import {
    StateOfMyPackSortDateActionType,
    StateOfMyPackSortDateReduser
} from "../components/common/StateOfMyPackSortDate/StateOfMyPackSortDateReduser";


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    page404: page404Reduser,
    pack: packReducer,
    paginationPack: paginationPackReducer,
    StateOfMyPackSortDate: StateOfMyPackSortDateReduser
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type CommonActionTypeForApp = LoginActionType | AppActionType
   | PackActionType
   | PaginationActionPackType | StateOfMyPackSortDateActionType;

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;


// @ts-ignore
window.store = store;
