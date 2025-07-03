import { Navigate, Outlet } from "react-router";
import "../admin/styles/admin.css";
import AdminHeader from "../components/adminheader";
import Dashboard from "../components/dashboard";
import { useAuth } from "../components/authcontext";
import { useState } from 'react';

export default function AdminLayout() {
    const isAuthenticated = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div>
            <AdminHeader />
            <div className={`d-flex ${isOpen ? 'flex-column' : 'flex-row' }`}>
                <div className="sidebar">
                    <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <Outlet />
            </div>
        </div>
    );
}