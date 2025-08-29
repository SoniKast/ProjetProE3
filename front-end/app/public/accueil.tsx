import { useEffect, useState } from "react";
import "./styles/base.css";
import { useNavigate } from 'react-router';
import { getApiUrl } from "../utils/api";

interface Evenement {
  id: number;
  titre: string;
  description: string;
  image?: string;
  date_debut?: string;
  date_fin?: string;
  categorie?: string;
}

interface Actualite {
  id: number;
  titre: string;
  description: string;
  date_creation: string;
}

function getEvenementsAleatoire(evenements: Evenement[], count = 3) {
  const shuffled = [...evenements].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function Accueil() {
    const [evenementsAleatoire, setEvenementsAleatoire] = useState<Evenement[]>([]);
    const [actualites, setActualites] = useState<Actualite[]>([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        async function getEventNews() {
            try {
                const [evenementsRes, actualitesRes] = await Promise.all([
                    fetch(getApiUrl("/api/evenements")),
                    fetch(getApiUrl("/api/news"))
                ]);

                if (!evenementsRes.ok || !actualitesRes.ok) throw new Error("Erreur de chargement");

                const evenementsData: Evenement[] = await evenementsRes.json();
                const actualitesData: Actualite[] = await actualitesRes.json();

                setEvenementsAleatoire(getEvenementsAleatoire(evenementsData, 3));
                setActualites(actualitesData);
            } catch (error) {
                console.error("Erreur lors du chargement :", error);
            }
        };

        getEventNews();
    }, []);

    // fonction pour raccourcir le texte de la description
    function raccourcir(text: string, maxLength = 100) {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }

    // pagination : 
    const itemsPerPage = 4;
    const paginatedActualites = actualites.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
    );
    const totalPages = Math.ceil(actualites.length / itemsPerPage);


    return (
        <>
            <div id="accueilCarousel" className="carousel slide mb-3 border-bottom">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#accueilCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#accueilCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#accueilCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="event/header/header1.png" className="d-block w-100 carousel-image-shadow" width="1980" height="400" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Premier évènement</h5>
                            <p></p>
                            <p><button className="btn btn-secondary bg-gradient" onClick={() => navigate(`event/1`)} >Voir détails &raquo;</button></p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="event/header/header2.png" className="d-block w-100 carousel-image-shadow" width="1980" height="400" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second évènement</h5>
                            <p>Texte test.</p>
                            <p><button className="btn btn-secondary bg-gradient" onClick={() => navigate(`event/2`)} >Voir détails &raquo;</button></p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="event/header/header3.png" className="d-block w-100 carousel-image-shadow" width="1980" height="400" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Troisième évènement</h5>
                            <p>Texte test.</p>
                            <p><button className="btn btn-secondary bg-gradient" onClick={() => navigate(`event/3`)} >Voir détails &raquo;</button></p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#accueilCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Précédent</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#accueilCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Suivant</span>
                </button>
            </div>
            <div className="container">
                <div className="row gx-5">
                    {evenementsAleatoire.map((evenements) => (
                    <div className="col-4" key={evenements.id}>
                        <div className="card">
                            <img src={`event/header/header${evenements.id}.png`} className="card-img-top" width="350px" height="200px" />
                            <div className="card-body">
                                <h5 className="card-title">{evenements.titre}</h5>
                                <p className="card-text">{evenements.description}</p>
                                <p><button className="btn btn-secondary bg-gradient" onClick={() => navigate(`event/${evenements.id}`)} >Voir détails &raquo;</button></p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <h2 className="mb-4 py-3">Actualités</h2>
                <div className="row gx-5">
                    {paginatedActualites.map((actu) => (
                    <div className="col-12 mb-3" key={actu.id}>
                        <div className="border p-3 rounded shadow-sm">
                        <h5 className="mb-1">
                            <span style={{ fontSize: '1.2rem' }}>{actu.titre}</span>{" "}
                            <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                            ({new Date(actu.date_creation).toLocaleDateString()})
                            </small>
                        </h5>
                        <p className="mb-2">{raccourcir(actu.description, 150)}</p>
                        <button
                            className="btn btn-link p-0"
                            onClick={() => navigate(`/actualites/${actu.id}`)}>
                            Lire la suite &raquo;
                        </button>
                        </div>
                    </div>
                    ))}
                    {totalPages > 1 && (
                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">
                            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setPage(page - 1)}>
                                Précédent
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                                <button className="page-link" onClick={() => setPage(p)}>
                                    {p}
                                </button>
                                </li>
                            ))}
                            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setPage(page + 1)}>
                                Suivant
                                </button>
                            </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </>
    );
}