import {instance, LoginResponseType} from '../LoginAPI/loginAPI';


// api
export const authAPI = {
    me() {
        return instance.post<LoginResponseType>("auth/me", {});
    },
    logout() {
        return instance.delete<LogoutType>("auth/me", {});
    },
};


// types
export type LogoutType = {
    info: string
    error: string
};
export type UpdateUserDataType = {
    name: string
    avatar: string
};


