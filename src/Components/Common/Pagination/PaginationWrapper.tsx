import React from "react";
import style from "./Pagination.module.scss";
import {Pagination} from "./Pagination";

type PackPropsType = {
    pageCount: number
    currentPage: number
    cardPacksTotalCount: number
    setPackPageCount: (val: number) => void
    setPackPage: (val: number) => void
}


export const PaginationWrapper: React.FC<PackPropsType> = ({
                                                               cardPacksTotalCount,
                                                               currentPage,
                                                               pageCount,
                                                               setPackPageCount,
                                                               setPackPage
                                                           }) => {


    return (
        <div className={style.paginationWrapperContainer}>

            <Pagination
                className={''}
                currentPage={currentPage}
                totalCount={cardPacksTotalCount}
                pageSize={pageCount}
                siblingCount={1}
                setPackPage={setPackPage}
            />
            <div className={style.paginationSelectContainer}>
                <span className={style.paginationSpan}>Show</span>
                <select
                    defaultValue={pageCount}
                    className={style.pagginationSelect}
                    onChange={(e) =>
                        setPackPageCount(+e.currentTarget.value)
                    }>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
                <span className={style.paginationSpan}>Cards per Page</span>
            </div>


        </div>
    )
}
