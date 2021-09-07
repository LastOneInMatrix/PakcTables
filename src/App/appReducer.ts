import {AppRootStateType, CommonActionTypeForApp, InferActionType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI} from "../api/auth-api/authAPI";


const initialState = {
    status: "idle",
    isInitialized: false,
    error: null,
    isWrongPath: false
} as AppInitialStateType;

export const appReducer =
    (state: InitialAppStateType = initialState, action: CommonActionTypeForApp): InitialAppStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/APP/SET-STATUS":
                return {...state, status: action.status};
            case "PET-PROJECT/ROOT/APP/IS-INITIALIZED":
                return {...state, isInitialized: action.isInitialized};
            case "PET-PROJECT/ROOT/APP/SET-ERROR":
                return {...state, error: action.error};
            case "PET-PROJECT/ROOT/APP/IS-WRONG-PATH":
                return {...state, isWrongPath: action.isWrongPath}
            default:
                return state;
        }
    };


// actions
export const actionsForApp = {
    setAppStatus: (status: StatusType) => ({type: "PET-PROJECT/ROOT/APP/SET-STATUS", status} as const),
    setAppError: (error: string | null) => ({type: "PET-PROJECT/ROOT/APP/SET-ERROR", error} as const),
    setIsInitialized: (isInitialized: boolean) => ({
        type: "PET-PROJECT/ROOT/APP/IS-INITIALIZED",
        isInitialized
    } as const),
    setIsWrongPath: (isWrongPath: boolean) => ({
        type: "PET-PROJECT/ROOT/APP/IS-WRONG-PATH",
        isWrongPath
    } as const)
};


// thunks
export const initializeApp = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        await authAPI.me();
        dispatch(actionsForApp.setIsInitialized(true));
    } catch (e: any) {
        dispatch(actionsForApp.setIsInitialized(true));
        dispatch(actionsForApp.setAppStatus("failed"));
        const error = e.response.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\'
            ? null
            : e.response.data.error
                ? e.response.data.error
                : (e.message + ', more details in the console');
        dispatch(actionsForApp.setAppError(error));
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
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, CommonActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, CommonActionTypeForApp>;

