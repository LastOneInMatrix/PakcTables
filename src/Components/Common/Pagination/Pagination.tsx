import React from 'react';
import classnames from './Pagination.module.scss';
import {usePagination, DOTS} from '../../../hook/usePagination';

type PaginationType = {
    className?: string
    currentPage: number
    totalCount: number
    pageSize: number
    siblingCount: number
    setPackPage: (value: number) => void
}

export const Pagination = ({
                               className,
                               currentPage,
                               totalCount,
                               pageSize,
                               siblingCount,
                               setPackPage
                           }: PaginationType) => {


    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });


    if (paginationRange) {
        if (currentPage === 0 || paginationRange.length < 2) {
            return null;
        }
    }


    const onNext = () => {
        setPackPage(currentPage + 1)
    };

    const onPrevious = () => {
        setPackPage(currentPage - 1)
    };


    // @ts-ignore
    let lastPage = paginationRange[paginationRange.length - 1]


    return (
        <ul
            className={classnames.paginationContainer}
        >
            {/* Left navigation arrow */}
            <li
                className={`${classnames.paginationItem} ${currentPage === 1 && classnames.disabled}`}
                onClick={onPrevious}
            >
                <div className={`${classnames.arrow} ${classnames.left}`}/>
            </li>
            {paginationRange && paginationRange.map(pageNumber => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li
                        className={`${classnames.paginationItem} ${classnames.dots}`}>&#8230;</li>;
                }

                // Render our Page Pills
                return (
                    <li
                        // key={+pageNumber}
                        className={`${classnames.paginationItem} ${pageNumber === currentPage && classnames.selected}`}
                        onClick={() =>
                            setPackPage(+pageNumber)
                        }
                    >
                        {pageNumber}
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li

                className={`${classnames.paginationItem} ${currentPage === lastPage && classnames.disabled}`}
                onClick={onNext}
            >
                <div className={`${classnames.arrow} ${classnames.right}`}/>
            </li>
        </ul>
    );
};

