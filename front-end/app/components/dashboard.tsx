
import { Link } from "react-router";
import DropdownMenu from './dropdown-menu';

interface DashboardProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard = ({ isOpen, setIsOpen }: DashboardProps) => {

    return (
        <>
            <button className="btn btn-outline-light d-md-none m-2" onClick={() => setIsOpen(!isOpen)}>☰ Menu</button>
            <aside className={`bg-dark vh-100 ${isOpen ? 'd-block' : 'd-none'} d-md-block`}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin" className="bg-light text-center nav-link link-secondary">Dashboard</Link>
                </li>
                <li className="nav-item bg-secondary">
                    <DropdownMenu
                        title="Gestion"
                        links={[
                            { label: "+ Évènements", path: "/admin/evenements" },
                            { label: "+ Actualités", path: "/admin/actualites" },
                            { label: "+ Inscriptions", path: "/admin/inscriptions" }
                        ]}
                    />
                </li>
            </ul>
        </aside>
        </>
    );
}

export default Dashboard; 