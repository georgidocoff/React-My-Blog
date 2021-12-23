import { REACT_APP_API_BASE_URL, Default_Tenant_Id } from '../shared/constants';
import * as cookiesService from '../services/cookiesService';

export const getUserById = async (id) => {
    //console.log(id);
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/user/get?id=${id}`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': cookiesService.GetToken(),           
            'Abp.TenantId': Default_Tenant_Id,    
        }
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}

export const getAllUsers = async () =>{
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/User/GetAll`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': cookiesService.GetToken(),           
            'Abp.TenantId': Default_Tenant_Id,    
        }
    });

    let jsonResult = await res.json();
   // console.log(jsonResult.result);
    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}

export const getRoles = async () =>{
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/Role/GetAll`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': cookiesService.GetToken(),           
            'Abp.TenantId': Default_Tenant_Id,    
        }
    });

    let jsonResult = await res.json();
    //console.log(jsonResult.result);
    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}

export const UpdateUserById = async (id, profileData) => {
    //console.log(profileData);
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/user/update`, {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            'Authorization': cookiesService.GetToken(),
        },
        body: JSON.stringify({
            "id": id,
            ...profileData
        })
    });

    let jsonResult = await res.json();
    //console.log(jsonResult);
}

export const deleteUserById = async (id) =>{
    //console.log(id);
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/User/Delete?Id=${id}`, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
            'Authorization': cookiesService.GetToken(),
        },
    });

    let jsonResult = await res.json();
    //console.log(jsonResult);
    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}