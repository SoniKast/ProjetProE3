import "./styles/admin.css";
import { Link, useNavigate } from "react-router";
import DropdownMenu from '../components/dropdown-menu';

export function Dashboard() {
    const navigate = useNavigate();

    return (
        <>
            <aside className="bg-dark vh-100" style={{ width: '250px' }}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin" className="bg-light text-center nav-link link-secondary">Dashboard</Link>
                </li>
                <li className="nav-item bg-secondary">
                    <DropdownMenu
                        title="Gestion"
                        links={[
                            { label: "+ Évènements", path: "/evenements" },
                            { label: "+ Actualités", path: "/actualites" },
                            { label: "+ Inscriptions", path: "/inscriptions" }
                        ]}
                    />
                </li>
            </ul>
        </aside>
        </>
    );
}