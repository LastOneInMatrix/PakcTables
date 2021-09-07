import {instance} from "../login-api/loginAPI";


// api
export const packAPI = {
    createNewCardsPack(cardsPack: NewCardsPackType) {
        return instance.post<{}>("cards/pack", {cardsPack});
    },
    removeCardsPack(id: string) {
        return instance.delete<{}>("cards/pack", {params: {id}});
    },
    updateCardsPackData(cardsPack: UpdatedPackDataType) {
        return instance.put<{}>("cards/pack", {cardsPack});
    },
    getCardsPack(data: RequestGetCardsPackType) {
        return instance.get<ResponseCardsPackType>("cards/pack", {
            params: {
                packName: data.packName,
                min: data.min,
                max: data.max,
                sortPacks: data.sortPacks,
                page: data.page,
                pageCount: data.pageCount,
                user_id: data.user_id,
            }
        });
    },
};


// types
export type NewCardsPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: "pack" | "folder"
};
export type UpdatedPackDataType = {
    _id: string
    name?: string
};
export type RequestGetCardsPackType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
};
export type CardsPackType = {
    "_id": string
    "user_id": string
    "user_name": string
    "private": boolean
    "name": string
    "path": string
    "grade": number
    "shots": number
    "cardsCount": number
    "type": "pack" | "folder"
    "rating": number
    "created": string
    "updated": string
    "more_id": string
    "__v": number
};
export type ResponseCardsPackType = {
    cardPacks: CardsPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}


