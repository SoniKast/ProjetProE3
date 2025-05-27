import { Link } from "react-router";

const PublicHeader = () => {
  return (
    <div className="navbar navbar-expand-lg p-3 mb-2 border-bottom">
      <header className="container">
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span className="fs-4">OpenEvent</span>
        </Link>

        <div className="nav nav-pills">
          <form className="d-flex">
              <div className="input-group">
                <input className="form-control form-control-mg" type="search" placeholder="Recherche" aria-label="Recherche"></input>
                <button className="btn btn-primary bg-gradient px-4" type="submit">
                    <i className="bi bi-search"></i>
                </button>
              </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default PublicHeader;
