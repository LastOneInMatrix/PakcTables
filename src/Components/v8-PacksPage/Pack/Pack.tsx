import React from "react";
import s from "./Pack.module.scss";
import {TablePackList} from "./TablePackList/TablePackList";
import {PaginationWrapper} from "../../common/Pagination/PaginationWrapper";

type PackPropsType = {
    pageCount: number
    currentPage: number
    cardPacksTotalCount: number
    setPackPageCount: (val: number) => void
    setPackPage: (val: number) => void

}

export const Pack: React.FC<PackPropsType> = ({
                                                  cardPacksTotalCount,
                                                  currentPage,
                                                  pageCount,
                                                  setPackPage,
                                                  setPackPageCount,
                                              }) => {

    return (
        <div className={s.pack}>
            <h1>Packs list</h1>
            <PaginationWrapper
                cardPacksTotalCount={cardPacksTotalCount}
                currentPage={currentPage}
                pageCount={pageCount}
                setPackPageCount={setPackPageCount}
                setPackPage={setPackPage}
            />
            <TablePackList/>
            <div style={{height: 70}}/>
        </div>
    )
}
