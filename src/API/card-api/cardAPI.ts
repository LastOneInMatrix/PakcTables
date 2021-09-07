import {instance} from "../login-api/loginAPI";


// api
export const cardAPI = {
    createCard(data: NewlyCreatedCardType) {
        return instance.post<{}>("cards/card", {data});
    },
    removeCard(id: string) {
        return instance.delete<{}>("cards/card", {params: {id}});
    },
    updateCardData(data: UpdatedCardDataType) {
        return instance.put<{}>("cards/card", {
            _id: data._id,
            question: data.question,
            comments: data.comments
        });
    },
    getCard(data: RequestGetCardType) {
        return instance.get<CardResponseType>("cards/card", {params: {
                cardAnswer: data.cardAnswer,
                cardQuestion: data.cardQuestion,
                cardsPack_id: data.cardsPack_id,
                min: data.min,
                max: data.max,
                sortCards: data.sortCards,
                page: data.page,
                pageCount: data.pageCount,
            }});
    },
};


// types
export type NewlyCreatedCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type: string
};
export type UpdatedCardDataType = {
    _id: string
    question?: any
    comments?: any
};
export type RequestGetCardType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: string
    max?: string
    sortCards?: string
    page?: number
    pageCount?: number
};
export type CardType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: "pack" | "folder"
    created: string
    updated: string
    __v: number
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    more_id: string
    question: string
    questionImg: string
    questionVideo: string

};
export type CardResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
};



