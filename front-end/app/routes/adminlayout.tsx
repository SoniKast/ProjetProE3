import { Outlet } from "react-router";

import AdminHeader from "../components/adminheader";
import { AuthProvider } from "../components/authcontext";

export default function AdminLayout() {
    return (
        <div>
            <AuthProvider>
                <AdminHeader />
                <Outlet />
            </AuthProvider>
        </div>
    );
}