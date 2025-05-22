import { Link } from "react-router";

export function Accueil() {
    return (
        <>
            <section className="py-5 text-center bg-primary">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light text-light">Album example</h1>
                        <p className="lead text-light">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                        <p>
                        <Link to="#" className="btn btn-success my-2">Main call to action</Link>
                        <Link to="#" className="btn btn-secondary my-2">Secondary action</Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}