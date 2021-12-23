import * as cookiesService from '../services/cookiesService';
import { REACT_APP_API_BASE_URL, Default_Tenant_Id, Default_Url_Search_By_Create_Time_Desc_Last_Three } from '../shared/constants';

export const create = async (articleData)=>{

    let jsonBody = JSON.stringify({...articleData.article});
    //console.log(jsonBody);
    

    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/Articles/Create`,{
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

export const getAll = async () =>{
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/Articles/GetAll`, {
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

export const getThree = async () =>{
    let res = await fetch(`${REACT_APP_API_BASE_URL}${Default_Url_Search_By_Create_Time_Desc_Last_Three}`, {
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