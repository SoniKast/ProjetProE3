import { Outlet } from "react-router";

import PublicHeader from "../components/publicheader";

export default function MainLayout() {
    return (
        <div>
            <PublicHeader />
            <Outlet />
        </div>
    );
}