import {
    Navigate,
    Outlet
} from 'react-router-dom';
import {
    authValues
} from '../../context/authContext';

function AuthGuard() {

    return !authValues.isAuthenticated() ? < Outlet / > : < Navigate to = "/" / >
}

export default AuthGuard