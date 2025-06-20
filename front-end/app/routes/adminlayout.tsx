import { Navigate, Outlet } from "react-router";

import AdminHeader from "../components/adminheader";
import { useAuth } from "../components/authcontext";

export default function AdminLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div>
            <AdminHeader />
            <Outlet />
        </div>
    );
}