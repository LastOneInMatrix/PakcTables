import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Dispatch} from "redux";
import style from "./App.module.scss";
import {Login} from "../components/v2-Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./appReducer";
import {AppRootStateType} from "./store";
import {Preloader} from "../components/common/Preloader/Preloader";
import {PacksPage} from "../components/v8-PacksPage/PacksPage";


function App() {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const dispatch: Dispatch<any> = useDispatch();


    useEffect(() => {
        dispatch(initializeApp())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className={style.wrapper}>
            {!isInitialized && <Preloader/>}
            <Switch>
                <Route exact path={"/"} render={() => <Login/>}/>
                <Route exact path={PATH.TEST_LOGIN} render={() => <Login/>}/>
                <Route exact path={PATH.TEST_PACK} render={() => <PacksPage/>}/>
                <Redirect from={'*'} to={PATH.TEST_PAGE404}/>
            </Switch>
        </div>
    )
}

export default App;

export const PATH = {
    TEST_LOGIN: '/login',
    TEST_PAGE404: '/page404',
    TEST_PACK: '/pack'
}
