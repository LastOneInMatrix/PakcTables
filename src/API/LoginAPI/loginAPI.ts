import axios from "axios";


// instance
export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
});


// api
export const loginAPI = {
    login(data: LoginType) {
        return instance.post<LoginResponseType>("auth/login", data).then(data => data.data);
    },
};


// types
export type LoginType = {
    email: string
    password: string
};
export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    token: string
    tokenDeathTime: Date
    __v: number
};
type ErrorType = { error?: string };
export type LoginResponseType = UserDataType & ErrorType;