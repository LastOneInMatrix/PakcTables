import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../app/App';
import {actionsForApp, StatusType} from '../../app/appReducer';
import {AppRootStateType} from '../../app/store';
import {Button} from '../common/Button/Button';
import {Preloader} from '../common/Preloader/Preloader';
import {AuthModal} from '../common/StylizedСomponents/AuthModal/AuthModal';
import style from './Page_404.module.scss'

function Page404() {
    const dispatch = useDispatch();
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status);

    useEffect(() => {
        dispatch(actionsForApp.setIsWrongPath(true))
        return () => {
            dispatch(actionsForApp.setIsWrongPath(false))
        }
    }, [])

    return (
        <AuthModal title={"404"} subtitle={'It looks like you\'re lost.'}>
            {status === 'loading' && <Preloader/>}
            <div className={style.bottom}>
                <div className={style.button_block}>
                    <NavLink to={PATH.TEST_LOGIN}><Button
                        color='dark-blue'
                        rounded
                    >Go to Homepage</Button></NavLink>
                </div>
            </div>
        </AuthModal>
    );
}

export default Page404;


