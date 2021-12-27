import {
    Navigate,
    Outlet
} from 'react-router-dom';
import {
    authValues
} from '../../context/authContext';

function ProtectedRoute() {

    return authValues.isAuthenticated() ? < Outlet / > : < Navigate to = "/login" / >
}

export default ProtectedRoute