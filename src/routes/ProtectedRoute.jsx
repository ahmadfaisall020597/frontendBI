import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    // ❌ belum login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ❌ role salah
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/403" replace />;
    }

    return <Outlet />;
}
