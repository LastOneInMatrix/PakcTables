import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import style from "./App.module.scss";
import {Login} from "../Components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./appReducer";
import {AppRootStateType} from "./store";

export const PATH = {
    TEST_LOGIN: '/login',
    TEST_PAGE404: '/page404',
    TEST_PACK: '/pack'
}

function App() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch]);
    return (
        <div className={style.wrapper}>
            <Switch>
                <Route exact path={"/"} render={() => <Login/>}/>
                <Route exact path={PATH.TEST_LOGIN} render={() => <Login/>}/>
                <Redirect from={'*'} to={PATH.TEST_PAGE404}/>
            </Switch>
        </div>
    )
}

export default App;
