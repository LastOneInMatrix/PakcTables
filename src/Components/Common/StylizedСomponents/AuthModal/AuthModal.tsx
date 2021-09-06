import React from "react";
import style from "./AuthModal.module.scss";
import {H1} from "../../Headings/H1";
import {H2} from "../../Headings/H2";

type AuthModalPropsType = {
    title?: string;
    subtitle: string
}


export const AuthModal: React.FC<AuthModalPropsType> = (props) => {
    const {children, title, subtitle} = props

    return (
        <div className={style.container}>
            <div className={style.container__body}>
                <H1 title={title}/>
                <H2>{subtitle}</H2>
                {children}
            </div>
        </div>
    )
}
