import jwt_decode from "jwt-decode";

import { Default_Token_Name } from "../shared/constants";

export const GetToken = () => {
  //This is a simple implementation of get auth cookie
  let storedCookies = document.cookie
    .split(";");
    
  let token = "";
  if (storedCookies.length > 0) {
    let authCookie= storedCookies.filter(x=>x.match(Default_Token_Name))[0];
    
    token = authCookie?.trimStart().trimEnd().slice(Default_Token_Name.length+1);
    //console.log(token);
  }

  if (!token) {
    return null;
  }

  return `Bearer ${token}`;
};

export const GetUserName = () => {
  const token = GetToken();
  
  if (token !== "Bearer null" && token !== "null" && token !== null) {
    //console.log("inside to decode name");
    let decoded = jwt_decode(token);
    let jsonDecode = JSON.stringify(decoded)
      .replace("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/", "")
      .replace("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/", "")
      .replace("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/", "")
      .replace("http://schemas.microsoft.com/ws/2008/06/identity/claims/", "");

    return JSON.parse(jsonDecode).name;
  }

  return "Anonymous";
};

export const GetUserId = () => {
  const token = GetToken();

  if (token !== "Bearer null" && token !== "null" && token !== null) {
    let decoded = jwt_decode(token);
    let jsonDecode = JSON.stringify(decoded)
      .replace("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/", "")
      .replace("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/", "")
      .replace("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/", "")
      .replace("http://schemas.microsoft.com/ws/2008/06/identity/claims/", "");

    return +JSON.parse(jsonDecode).nameidentifier;
  }

  return 0;
};

export const GetUserRole = () => {
  const token = GetToken();
  
  if (token !== "Bearer null" && token !== "null" && token !== null) {
    //console.log("inside to decode role");
    let decoded = jwt_decode(token);
    let jsonDecode = JSON.stringify(decoded)
      .replace("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/", "")
      .replace("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/", "")
      .replace("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/", "")
      .replace("http://schemas.microsoft.com/ws/2008/06/identity/claims/", "");
    
    return JSON.parse(jsonDecode).role;
  }

  return ['NONE'];
};