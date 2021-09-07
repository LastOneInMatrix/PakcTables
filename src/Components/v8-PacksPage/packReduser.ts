import {CommonActionTypeForApp, InferActionType} from "../../app/store";
import {actionsForApp, ThunkDispatchType, ThunkType} from "../../app/appReducer";
import {
    CardsPackType,
    NewCardsPackType,
    packAPI,
    RequestGetCardsPackType,
    UpdatedPackDataType
} from "../../api/pack-api/packAPI";
import {handleError} from "../utills/error-utils/ErrorUtils";
import {actionsForPackPagination} from "../common/Pagination/paginationPackReduser";


const initialState = [] as PackDomainType[];

export const packReducer =
    (state: InitialPackStateType = initialState, action: CommonActionTypeForApp): InitialPackStateType => {
        switch (action.type) {
            case "PROJECT/ROOT/PACK/REMOVE-PACK":
                return state.filter(p => p._id !== action.id);
            case "PROJECT/ROOT/PACK/CREATE-PACK":
                return [{...action.pack, firstProperty: 1, secondProperty: 2}, ...state];
            case "PROJECT/ROOT/PACK/UPDATE-PACK-TITLE":
                return state.map( p => p._id === action.id ? {...p, title: action.title} : p);
            case "PROJECT/ROOT/PACK/SET-PACK-LISTS":
                return action.pack.map((p) => ({...p, firstProperty: 1, secondProperty: 2}));
            case "PROJECT/ROOT/PACK/UPDATE-PACK-FIRST-PROPERTY":
                return state.map( p => p._id === action.id ? {...p, firstProperty: action.first} : p);
            case "PROJECT/ROOT/PACK/UPDATE-PACK-SECOND-PROPERTY":
                return state.map( p => p._id === action.id ? {...p, filter: action.second} : p);
            case "PROJECT/ROOT/PACK/CLEAR-DATA":
                return initialState;
            default:
                return state;
        }
    };


// actions
export const actionsForPack = {
    removePack:  (id: string) => ({
        type: "PROJECT/ROOT/PACK/REMOVE-PACK",
        id,
    } as const ),
    createPack: (pack: CardsPackType) => ({
        type: "PROJECT/ROOT/PACK/CREATE-PACK",
        pack,
    } as const),
    updatePackTitle: (id: string, title?: string) => ({
        type: "PROJECT/ROOT/PACK/UPDATE-PACK-TITLE",
        id,
        title,
    } as const),
    setPackLists: (pack: CardsPackType[]) => ({
        type: "PROJECT/ROOT/PACK/SET-PACK-LISTS",
        pack
    } as const),
    updatePackFirstProperty: (id: string, first: any) => ({
        type: "PROJECT/ROOT/PACK/UPDATE-PACK-FIRST-PROPERTY",
        id,
        first,
    } as const),
    updatePackSecondProperty: (id: string, second: any) => ({
        type: "PROJECT/ROOT/PACK/UPDATE-PACK-SECOND-PROPERTY",
        id,
        second,
    } as const),
    clearData: () => ({
        type: "PROJECT/ROOT/PACK/CLEAR-DATA"
    } as const),
};


// thunks
export const fetchPack = (data: RequestGetCardsPackType): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        let res = await packAPI.getCardsPack(data);
        dispatch(actionsForPack.setPackLists(res.data.cardPacks));
        dispatch(actionsForPackPagination.setPackTotalCount(res.data.cardPacksTotalCount))
        dispatch(actionsForApp.setAppStatus("succeeded"));
    } catch(e: any) {
        handleError(e, dispatch);
    }
};

export const removePack = (packId: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        await packAPI.removeCardsPack(packId);
        dispatch(actionsForPack.removePack(packId));
        dispatch(actionsForApp.setAppStatus("idle"));
    } catch(e: any) {
        handleError(e, dispatch);
    }
};

export const createPack = (dataForNewPack: NewCardsPackType, dataForRequest: RequestGetCardsPackType)
        : ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        dispatch(actionsForApp.setAppStatus("loading"));
        await packAPI.createNewCardsPack(dataForNewPack);
        let res = await packAPI.getCardsPack(dataForRequest);
        dispatch(actionsForPack.setPackLists(res.data.cardPacks));
        dispatch(actionsForApp.setAppStatus("succeeded"));
    } catch(e: any) {
        handleError(e, dispatch);
    }
};

export const updatePackTitle = (data: UpdatedPackDataType): ThunkType =>
    async (dispatch: ThunkDispatchType) => {
        try {
            dispatch(actionsForApp.setAppStatus("loading"));
            await packAPI.updateCardsPackData(data);
            dispatch(actionsForPack.updatePackTitle(data._id, data.name));
            dispatch(actionsForApp.setAppStatus("idle"));
        } catch(e: any) {
            handleError(e, dispatch);
        }
    };


// types
export type InitialPackStateType = typeof initialState;
export type PackActionType = InferActionType<typeof actionsForPack>;

export type PackDomainType = CardsPackType & {
    firstProperty: any
    secondProperty: any

};