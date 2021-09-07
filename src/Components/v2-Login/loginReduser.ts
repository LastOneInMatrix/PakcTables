import {loginAPI, LoginResponseType, LoginType, UserDataType} from "../../api/login-api/loginAPI";
import {CommonActionTypeForApp, InferActionType} from "../../app/store";
import {authAPI, UpdateUserDataType} from "../../api/auth-api/authAPI";
import {actionsForApp, ThunkDispatchType, ThunkType} from "../../app/appReducer";

const initialState = {
    _id: '',
    avatar: '',
    email: '',
    isAdmin: false,
    name: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    verified: false,
    updated: {},
    created: {},
    isLoggedIn: false,
    token: '',
    tokenDeathTime: {},
    __v: 0,
} as UserDataDomainType;

export const loginReducer =
    (state: InitialAuthStateType = initialState, action: CommonActionTypeForApp): InitialAuthStateType => {
        switch (action.type) {
            case "PET-PROJECT/ROOT/LOGIN/SET-IS-LOGGED-IN":
                return {...state, isLoggedIn: action.value};
            case "PET-PROJECT/ROOT/LOGIN/UPDATE-USER-DATA":
                return {...state,};
            case "PET-PROJECT/ROOT/LOGIN/GET-USER":
                return {
                    ...state,
                    name: action.data.name,
                    avatar: action.data.avatar,
                    email: action.data.email,
                    _id: action.data._id,
                    isAdmin: action.data.isAdmin,
                    publicCardPacksCount: action.data.publicCardPacksCount,
                    rememberMe: action.data.rememberMe,
                    verified: action.data.verified,
                    updated: action.data.updated,
                    created: action.data.created,
                    token: action.data.token,
                    __v: 0,
                    isLoggedIn: true,
                };
            default:
                return state;
        }
    };


// actions
export const actionsForLogin = {
    setIsLoggedIn: (value: boolean) => ({type: "PET-PROJECT/ROOT/LOGIN/SET-IS-LOGGED-IN", value} as const),
    updateUserData: (data: UpdateUserDataType) => ({type: "PET-PROJECT/ROOT/LOGIN/UPDATE-USER-DATA", data} as const),
    getUser: (data: LoginResponseType) => ({type: "PET-PROJECT/ROOT/LOGIN/GET-USER", data} as const),
};


// thunks
export const login = (data: LoginType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        let res = await loginAPI.login(data);
        dispatch(actionsForLogin.setIsLoggedIn(true));
        dispatch(actionsForApp.setAppStatus("succeeded"));
        dispatch(actionsForLogin.getUser(res.data));
    } catch (e: any) {
        dispatch(actionsForApp.setAppStatus("failed"));
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(actionsForApp.setAppError(error))
    }
};
export const logout = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        await authAPI.logout();
        dispatch(actionsForApp.setAppStatus("succeeded"));
        dispatch(actionsForLogin.setIsLoggedIn(false));
        dispatch(actionsForApp.setIsInitialized(true));
    } catch (e: any) {
        dispatch(actionsForApp.setAppStatus("failed"));
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(actionsForApp.setAppError(error))
    }
};


// types
export type UserDataDomainType = UserDataType & { isLoggedIn: boolean };
export type InitialAuthStateType = typeof initialState;
export type LoginActionType = InferActionType<typeof actionsForLogin>;