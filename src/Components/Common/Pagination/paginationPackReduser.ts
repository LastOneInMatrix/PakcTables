import {ResponseCardsPackType} from "../../../api/pack-api/packAPI";
import {CommonActionTypeForApp, InferActionType} from "../../../app/store";



const initialState = {
    pageCount: 5,
    page: 1,
    cardPacksTotalCount: 10
} as ResponseCardsPackType;

export const paginationPackReducer =
    (state: InitialPaginationStateType = initialState, action: CommonActionTypeForApp): InitialPaginationStateType => {
        switch (action.type) {
            case "PROJECT/ROOT/PAGINATION/SET-PACK-TOTAL-COUNT":
                return {...state, cardPacksTotalCount: action.val}
            case "PROJECT/ROOT/PAGINATION/SET-PACK-PAGE":
                return {...state, page: action.val}
            case "PROJECT/ROOT/PAGINATION/SET-PACK-PAGE-COUNT":
                return {...state, pageCount: action.val}
            default:
                return state;
        }
    };


// actions
export const actionsForPackPagination = {

    setPackTotalCount: (val: number) => ({
        type: "PROJECT/ROOT/PAGINATION/SET-PACK-TOTAL-COUNT",
        val
    } as const),
    setPackPage: (val: number) => ({
        type: "PROJECT/ROOT/PAGINATION/SET-PACK-PAGE",
        val
    } as const),
    setPackPageCount: (val: number) => ({
        type: "PROJECT/ROOT/PAGINATION/SET-PACK-PAGE-COUNT",
        val
    } as const)

};



// types
export type InitialPaginationStateType = typeof initialState;
export type PaginationActionPackType = InferActionType<typeof actionsForPackPagination>;

