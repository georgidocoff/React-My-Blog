import * as cookiesService from '../services/cookiesService';
import { REACT_APP_API_BASE_URL, Default_Tenant_Id,Default_User_Role,Default_User_Activity, Default_Admin_Role } from '../shared/constants';

export const login = async (userNameOrEmailAddress,password)=>{
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/TokenAuth/Authenticate`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',             
            'Abp.TenantId': Default_Tenant_Id,    
        },
        body: JSON.stringify({ userNameOrEmailAddress, password })
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}

export const register = async (emailAddress, password, rePassword, userName, name, surname)=>{
    let roleNames =[];
    roleNames.push(Default_User_Role);
    let jsonBody = JSON.stringify({ 
        emailAddress, 
        password, 
        rePassword,
        "isActive": Default_User_Activity,
        userName, 
        name, 
        surname,
        roleNames
    });
    console.log(jsonBody);
    

    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/User/Create`,{//api/services/app/account/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json', 
            'Authorization': cookiesService.GetToken(),
            'Abp.TenantId': Default_Tenant_Id,         
        },
        body:jsonBody,
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}

export const logout=(accessToken)=>{
    return fetch(`${REACT_APP_API_BASE_URL}`, {
        headers: {
            'Authorization': accessToken,
        }
    })
}

export const isAuth=()=>{

}

export const isAdmin=()=>{
    const roles = cookiesService.GetUserRole();
   return roles == Default_Admin_Role;
}