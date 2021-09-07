import {CommonActionTypeForApp} from "../../../app/store";
import {actionsForApp} from "../../../app/appReducer";
import {Dispatch} from "redux";


export const handleError = (error: ErrorType, dispatch: Dispatch<CommonActionTypeForApp>) => {
    dispatch(actionsForApp.setAppStatus("failed"));
    dispatch(actionsForApp.setAppError(error.response
        ? error.response.data.error
        : (error.message + ', more details in the console')));
};
export type ErrorType = {
    response: {
        data: {
            error: string
        }
    },
    message: string
};