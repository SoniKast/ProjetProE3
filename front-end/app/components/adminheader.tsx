import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./authcontext";

const AdminHeader = () => {
    const { isAuthenticated, email, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

  return (
    <div className="navbar navbar-expand-lg bg-dark p-3 border-bottom border-dark">
      <header className="container">
        <Link to="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-light text-decoration-none">
          <span className="fs-4">OpenEvent <span className="blockquote text-danger">Admin</span></span>
        </Link>

        <div className="nav nav-pills">
            {isAuthenticated  ? (
              <>
                <span className="d-flex text-light align-items-center font-weight-bold">Connecté en tant que :&nbsp;<strong>{email}</strong>&nbsp;</span>
                <button onClick={handleLogout} className="btn btn-outline-light">Déconnexion</button>
              </>
            ) : (
                <Link to="/admin/login" className="btn btn-primary bg-gradient px-4">
                    Connexion
                </Link>
            )}
        </div>
      </header>
    </div>
  );
}

export default AdminHeader;
