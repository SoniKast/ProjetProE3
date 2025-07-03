import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

interface Actualite {
  id: number;
  titre: string;
  description: string;
  date_creation: string;
  image?: string;
}

export function NewsDisplay() {
    const [actualites, setActualites] = useState<Actualite[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvenement = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/news/');
                if (!response.ok) {
                    throw new Error('Erreur dans la récupération des actualités');
                }
                const data: Actualite[] = await response.json();

                setActualites(data); // The data will already be flattened
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
                <h1>Actualités</h1>
                <table className="table table-hover table-striped table-bordered border-dark">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date de création</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {actualites.length > 0 ? (
                        actualites.map((actualite) => (
                            <tr key={actualite.id}>
                                <td>{actualite.id}</td>
                                <td>{actualite.titre}</td>
                                <td>{actualite.description}</td>
                                <td>{new Date(actualite.date_creation).toLocaleDateString('fr-FR')}</td>
                                <td>
                                    <div className="text-center">
                                        <button className="btn btn-primary bg-gradient px-4" onClick={() => navigate(`/admin/actualites/edit/${actualite.id}`)}>
                                            Modification
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Aucun actualité enregistrée.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="text-center">
                    <Link className="btn btn-primary bg-gradient px-4" to="/admin/create-news">Créer une actualité</Link>
                </div>
            </div>
        </>
    )
}