import { Link } from 'react-router';

const Sidebar = () => {
    return (
        <>
            <div className="p-3 bg-secondary" style={{width: 250}}>
                <ul className="list-unstyled ps-0">
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center text-light rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                    Home
                    </button>
                    <div className="collapse show" id="home-collapse">
                    <ul className="btn-toggle-nav fw-normal pb-1">
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Overview</Link></li>
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Updates</Link></li>
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Reports</Link></li>
                    </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center text-light rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                    Dashboard
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                    <ul className="btn-toggle-nav fw-normal pb-1">
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Overview</Link></li>
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Weekly</Link></li>
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Monthly</Link></li>
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Annually</Link></li>
                    </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center text-light rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                    Orders
                    </button>
                    <div className="collapse" id="orders-collapse">
                    <ul className="btn-toggle-nav fw-normal pb-1">
                        <li><Link to="#" className="link-dark text-decoration-none text-light rounded">New</Link></li>
                        <li><Link to="#" className="link-dark text-decoration-none text-light rounded">Processed</Link></li>
                        <li><Link to="#" className="link-dark text-decoration-none text-light rounded">Shipped</Link></li>
                        <li><Link to="#" className="link-dark text-decoration-none text-light rounded">Returned</Link></li>
                    </ul>
                    </div>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                    <button className="btn btn-toggle text-light d-inline-flex align-items-center text-light rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                    Account
                    </button>
                    <div className="collapse" id="account-collapse">
                    <ul className="btn-toggle-nav fw-normal pb-1">
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">New...</Link></li>
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Profile</Link></li>
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Settings</Link></li>
                        <li><Link to="#" className="link-dark d-inline-flex text-decoration-none text-light rounded">Sign out</Link></li>
                    </ul>
                    </div>
                </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar;
