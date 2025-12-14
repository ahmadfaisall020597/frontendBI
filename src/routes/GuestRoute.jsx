import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/authStorage';

export default function GuestRoute() {
    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
}
