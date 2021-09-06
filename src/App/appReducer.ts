import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI} from "../API/AuthAPI/authAPI";


const initialState = {
    status: "idle",
    isInitialized: false,
    error: null,
} as AppInitialStateType;

export const appReducer =
    (state: InitialAppStateType = initialState, action: CommonActionTypeForApp): InitialAppStateType => {
        switch (action.type) {
            case "TEST-PROJECT/ROOT/APP/SET-STATUS":
                return {...state, status: action.status};
            case "TEST-PROJECT/ROOT/APP/IS-INITIALIZED":
                return {...state, isInitialized: action.isInitialized};
            case "TEST-PROJECT/ROOT/APP/SET-ERROR":
                return {...state, error: action.error};
            default:
                return state;
        }
    };


// actions
export const actionsForApp = {
    setAppStatus: (status: StatusType) => ({type: "TEST-PROJECT/ROOT/APP/SET-STATUS", status} as const),
    setAppError: (error: string | null) => ({type: "TEST-PROJECT/ROOT/APP/SET-ERROR", error} as const),
    setIsInitialized: (isInitialized: boolean) => ({
        type: "TEST-PROJECT/ROOT/APP/IS-INITIALIZED",
        isInitialized
    } as const),
};


// thunks
export const initializeApp = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        await authAPI.me();
        dispatch(actionsForApp.setIsInitialized(true));
        dispatch(actionsForApp.setAppStatus("succeeded"));
    } catch (e: any) {
        dispatch(actionsForApp.setIsInitialized(true));
        dispatch(actionsForApp.setAppStatus("failed"));
        const error = e.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\'
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(actionsForApp.setAppError(error));
        dispatch(actionsForApp.setAppStatus("failed"));
    }
};


// types
export type InitialAppStateType = typeof initialState;
export type AppActionType = InferActionType<typeof actionsForApp>;
export type AppInitialStateType = {
    status: StatusType
    isInitialized: boolean
    error: string | null
    isWrongPath: boolean
};
export type StatusType = "idle" | "loading" | "succeeded" | "failed";
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, CommonActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, CommonActionTypeForApp>;

