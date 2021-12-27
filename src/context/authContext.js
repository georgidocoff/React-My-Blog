import React from "react";

import {
    isAuth,
    isAdmin
} from '../services/authService';

export const AuthContext = React.createContext();

function isAuthenticated() {
    let result = isAuth();
    return result;
}

export const authValues = {
    isAuthenticated,
}