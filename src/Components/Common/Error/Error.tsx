import React from "react";
import style from "./Error.module.scss";

type ErrorPropsType = {
    errorMessage: string | null
}

export const Error: React.FC<ErrorPropsType> = ({errorMessage}) => {
    let errorClassName = errorMessage ? style.error_block__visible : style.error_block__hidden;

    return (
        <div className={errorClassName}>
            <span className={style.error_icon}>!</span>
            <span className={style.error_message}>{errorMessage ? errorMessage : null}</span>
        </div>
    )
}
