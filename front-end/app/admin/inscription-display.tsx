import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface Inscriptions {
  id: number;
  nom: string;
  email: string;
  date_inscription: string;
}

export function InscriptionDisplay() {
    const [inscriptions, setInscriptions] = useState<Inscriptions[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvenement = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/inscriptions/');
                if (!response.ok) {
                    throw new Error('Erreur dans la récupération des inscriptions');
                }
                const data: Inscriptions[] = await response.json();

                setInscriptions(data); // The data will already be flattened
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvenement();
    }, []);

    if (loading) {
        return <div className="main-page"><center>Chargement des inscriptions...</center></div>;
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
                            <th scope="col">Nom</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date d'inscription</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {inscriptions.length > 0 ? (
                        inscriptions.map((inscription) => (
                            <tr key={inscription.id}>
                                <td>{inscription.id}</td>
                                <td>{inscription.nom}</td>
                                <td>{inscription.email}</td>
                                <td>{new Date(inscription.date_inscription).toLocaleDateString('fr-FR')}</td>
                                <td>
                                    <div className="text-center">
                                        <button className="btn btn-primary bg-gradient px-4" onClick={() => navigate(`/admin/inscriptions/edit/${inscription.id}`)}>
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
            </div>
        </>
    )
}