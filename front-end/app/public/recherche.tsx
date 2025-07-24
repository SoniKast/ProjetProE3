import { useState, useEffect } from "react";
import { Link } from 'react-router';

export function Recherche() {
    const [titre, setTitre] = useState('');
    const [categorie, setCategorie] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const [results, setResults] = useState<Evenement[]>([]);

    interface Evenement {
        id: number;
        titre: string;
        description: string;
        description_detail: string;
        categorie: string;
        date_debut: string;
    }

    useEffect(() => {
        // Charger tous les événements une fois au montage
        fetch("http://localhost:3000/api/evenements")
            .then(res => res.json())
            .then(data => setEvenements(data))
            .catch(err => console.error("Erreur de chargement :", err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const normalize = (text: string) =>
        text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const motsCles = normalize(titre);

        const filtres = evenements.filter(ev => {
            const matchTitre = ev.titre?.toLowerCase().includes(motsCles);
            const matchDesc = ev.description?.toLowerCase().includes(motsCles);
            const matchDetail = ev.description_detail?.toLowerCase().includes(motsCles);
            const matchMotCle = !motsCles || matchTitre || matchDesc || matchDetail;

            const matchCategorie = !categorie || ev.categorie === categorie;
            const matchDate = !dateDebut || ev.date_debut.startsWith(dateDebut);

            return matchMotCle && matchCategorie && matchDate;
        });

        setResults(filtres);
    };

    return (
        <>
            <div>
                <div className="container-fluid p-5 bg-dark"></div>
                <div className="container py-2">
                    <div className="h2">Page de recherche</div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Options de recherche</h5>
                            <form onSubmit={handleSearch}>
                                <div className="input-group mb-3">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="titreInput" value={titre} placeholder="Mots-clés" onChange={(e) => setTitre(e.target.value)} />
                                        <label htmlFor="titreInput">Mots-clés</label>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="categorieInput" value={categorie} placeholder="Catégorie" onChange={(e) => setCategorie(e.target.value)} />
                                        <label htmlFor="categorieInput">Catégorie</label>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="form-floating">
                                        <input type="date" className="form-control" id="dateDebutInput" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                                        <label htmlFor="dateDebutInput">Date de début de l'évènement</label>
                                    </div>
                                </div>
                                <div className="text-center p-3">
                                    <button className="btn btn-primary bg-gradient px-4" type="submit">Rechercher</button>
                                </div>
                            </form>
                        </div>
                    </div>   

                    {/* Résultats de recherche */}
                    <div className="mt-4">
                        <h4>Résultats</h4>
                        {results.length > 0 ? (
                            <ul className="list-group">
                                {results.map((event) => (
                                    <Link key={event.id} to={`event/${event.id}`} className="text-decoration-none mb-2">
                                        <li className="list-group-item p-3">
                                            <h5>Titre: {event.titre}</h5>
                                            Description: {event.description}<br />
                                            Catégorie: {event.categorie}<br />
                                            Date: {new Date(event.date_debut).toLocaleDateString()}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucun résultat trouvé.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}