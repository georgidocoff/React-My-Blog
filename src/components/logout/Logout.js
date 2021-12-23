import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import * as authService from "../../services/authService";
import { Default_Token_Name } from '../../shared/constants';

const Logout = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([Default_Token_Name]);

    useEffect(() => {
        authService.logout(cookies)
            .then(() => {
                setCookie(Default_Token_Name, null, { path: '/' });
                setTimeout(() => {                   
                    removeCookie(Default_Token_Name);
                    navigate('/');
                }, 500);
            })
            .catch((err)=>
                console.log(err)
            )
    }, [cookies, setCookie, removeCookie, navigate]);

    return null;
}

export default Logout;