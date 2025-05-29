import { Link } from "react-router";
import { useEffect, useState } from "react";
import "./styles/base.css";
import { useNavigate } from 'react-router';

interface Evenement {
  id: number;
  titre: string;
  description: string;
  image?: string;
  date_debut?: string;
  date_fin?: string;
  categorie?: string;
}

function getEvenementsAleatoire(evenements: Evenement[], count = 3) {
  const shuffled = [...evenements].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function Accueil() {
    const [evenementsAleatoire, setEvenementsAleatoire] = useState<Evenement[]>([]);
    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getEvenements() {
            try {
                const response = await fetch("http://localhost:3000/api/evenements");
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des évènements");
                }
                const data: Evenement[] = await response.json();

                setEvenements(data);
                setEvenementsAleatoire(getEvenementsAleatoire(data, 3));
            } catch (error) {
                console.error("Erreur lors de la récupération des événements:", error);
            }
        }

        getEvenements();
    }, []);

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
                        <img src="event/header/placeholder1.png" className="d-block w-100 carousel-image-shadow" width="1980" height="400" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Premier évènement</h5>
                            <p>Texte test.</p>
                            <p><button className="btn btn-secondary bg-gradient" onClick={() => navigate(`event/1`)} >Voir détails &raquo;</button></p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="event/header/placeholder2.png" className="d-block w-100 carousel-image-shadow" width="1980" height="400" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second évènement</h5>
                            <p>Texte test.</p>
                            <p><button className="btn btn-secondary bg-gradient" onClick={() => navigate(`event/2`)} >Voir détails &raquo;</button></p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="event/header/placeholder3.png" className="d-block w-100 carousel-image-shadow" width="1980" height="400" />
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
                            <img src={`event/header/placeholder${evenements.id}.png`} className="card-img-top" width="350px" height="200px" />
                            <div className="card-body">
                                <h5 className="card-title">{evenements.titre}</h5>
                                <p className="card-text">{evenements.description}</p>
                                <p><button className="btn btn-secondary bg-gradient" onClick={() => navigate(`event/${evenements.id}`)} >Voir détails &raquo;</button></p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}