import {loginAPI, LoginResponseType, LoginType, UserDataType} from "../../API/LoginAPI/loginAPI";
import {CommonActionTypeForApp, InferActionType} from "../../App/store";
import {actionsForApp, ThunkDispatchType, ThunkType} from "../../App/appReducer";

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
            case "TEST-PROJECT/ROOT/LOGIN/SET-IS-LOGGED-IN":
                return {...state, isLoggedIn: action.value};
            case "TEST-PROJECT/ROOT/LOGIN/GET-USER":
                console.log(action.data)
                return {
                    ...state,
                    ...action.data,
                    __v: 0,
                    isLoggedIn: true,
                };
            default:
                return state;
        }
    };


// actions
export const actionsForLogin = {
    setIsLoggedIn: (value: boolean) => ({type: "TEST-PROJECT/ROOT/LOGIN/SET-IS-LOGGED-IN", value} as const),
    getUser: (data: LoginResponseType) => ({type: "TEST-PROJECT/ROOT/LOGIN/GET-USER", data} as const),
};


// thunks
export const login = (data: LoginType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        let res = await loginAPI.login(data);
        dispatch(actionsForLogin.setIsLoggedIn(true));
        dispatch(actionsForApp.setAppStatus("succeeded"));
        dispatch(actionsForLogin.getUser(res));
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