import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

interface Evenement {
    id: number;
    titre: string;
    description: string;
    date_debut: string;
    date_fin: string;
    categorie: string;
}

export function EventDisplay() {
    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvenement = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/evenements/');
                if (!response.ok) {
                    throw new Error('Erreur dans la récupération des évènements');
                }
                const data: Evenement[] = await response.json();

                setEvenements(data); // The data will already be flattened
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvenement();
    }, []);

    if (loading) {
        return <div className="main-page"><center>Chargement des évènements...</center></div>;
    }

    if (error) {
        return <div className="main-page"><center>Erreur: {error}</center></div>;
    }

    return (
        <>
            <div className="container-fluid bg-light p-3 border border-2 rounded m-4">
                <h1>Évènements</h1>
                <table className="table table-hover table-striped table-bordered border-dark">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date de début</th>
                            <th scope="col">Date de fin</th>
                            <th scope="col">Catégorie</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {evenements.length > 0 ? (
                        evenements.map((evenement) => (
                            <tr key={evenement.id}>
                                <td>{evenement.id}</td>
                                <td>{evenement.titre}</td>
                                <td>{evenement.description}</td>
                                <td>{new Date(evenement.date_debut).toLocaleDateString('fr-FR')}</td>
                                <td>{new Date(evenement.date_fin).toLocaleDateString('fr-FR')}</td>
                                <td>{evenement.categorie}</td>
                                <td>
                                    <div className="text-center">
                                        <button className="btn btn-primary bg-gradient px-4" onClick={() => navigate(`/admin/evenements/edit/${evenement.id}`)}>
                                            Modification
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Aucun évènement enregistré.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="text-center">
                    <Link className="btn btn-primary bg-gradient px-4" to="/admin/create-event">Créer un évènement</Link>
                </div>
            </div>
        </>
    )
}