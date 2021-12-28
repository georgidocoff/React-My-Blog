import * as cookiesService from '../services/cookiesService';
import {
    REACT_APP_API_BASE_URL,
    Default_Tenant_Id,
    Default_Url_Search_By_Create_Time_Desc_Last_Three
} from '../shared/constants';

export const create = async (articleData) => {

    let jsonBody = JSON.stringify({
        ...articleData
    });
    //console.log(jsonBody);


    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/Articles/Create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': cookiesService.GetToken(),
            'Abp.TenantId': Default_Tenant_Id,
        },
        body: jsonBody,
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}

export const getArticleById = async (articleId) => {
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/Articles/Get?Id=${articleId}`, {
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

export const getSearch = async (searchData) => {
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/Articles/GetAll?Keyword=${searchData}`, {
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

export const UpdateArticleById = async (articleId, articleData) => {
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/Articles/Update`, {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            'Authorization': cookiesService.GetToken(),
        },
        body: JSON.stringify({
            "id": articleId,
            ...articleData
        })
    });

    let jsonResult = await res.json();
    // console.log(jsonResult.result);
    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}

export const getAll = async () => {
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

export const getUserArticles = async (userId) => {
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
        return jsonResult.result.items.filter(x=>x.creatorUserId==userId);
    } else {
        throw jsonResult.message;
    }
}

export const getThree = async () => {
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

export const deleteArticleById = async (id) =>{
    //console.log(id);
    let res = await fetch(`${REACT_APP_API_BASE_URL}/api/services/app/Articles/Delete?Id=${id}`, {
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