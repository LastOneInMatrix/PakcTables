import React from "react";
import style from "./Preloader.module.scss";
import preloader from "../../../assets/image/loader.svg";


export const Preloader = React.memo(() => {

    return (
        <>
            <div className={style.isFetching}>
                <img src={preloader} alt={'loading spinner'}/>
                <div className={style.overlay}/>
            </div>
        </>
    )
})