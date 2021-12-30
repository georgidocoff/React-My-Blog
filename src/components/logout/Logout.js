import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import * as authService from "../../services/authService";
import { Default_Token_Name } from '../../shared/constants';
import { useNotificationContext, types } from '../../context/NotificationContext';

import Loading from '../loading/Loading';

const Logout = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotificationContext();
    const [showLoading, setShowLoading] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies([Default_Token_Name]);

    useEffect(() => {
        setShowLoading(true);
        authService.logout(cookies)
            .then(() => {
                setCookie(Default_Token_Name, null, { path: '/' });
                setShowLoading(false);
                setTimeout(() => {                   
                    removeCookie(Default_Token_Name);
                    addNotification('You successfully log out.', types.success);
                    navigate('/');
                }, 500);
            })
            .catch((err)=>{
                console.log(err);
                setShowLoading(false);
                removeCookie(Default_Token_Name);
            })
    }, [cookies, setCookie, removeCookie, navigate]);

    return (showLoading?<Loading/>:null);
}

export default Logout;