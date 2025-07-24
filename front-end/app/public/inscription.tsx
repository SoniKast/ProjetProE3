import { useState } from "react";
import { useParams, useNavigate, useLoaderData } from 'react-router';

export function Inscription() {
    const { id } = useParams();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Détails de l'évènement
    const event = useLoaderData() as {
        id: number;
        titre: string;
    };

    const handleEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        const now = new Date().toISOString(); // Get current date-time in ISO format

        try {
            const response = await fetch("http://localhost:3000/api/inscriptions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nom,
                    email,
                    date_inscription: now,
                    id_evenement: event.id
                })
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Erreur lors de l'inscription.");
                setIsSubmitting(false);
                return;
            }

            navigate("/");
        } catch (err) {
            setError("Erreur lors de l'inscription.");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-secondary" style={{ minHeight: "calc(100vh - 80px)" }}>
                <div className="row w-100">
                    <div className="col-lg-4 mx-auto card p-5 border-secondary border-2">
                        <h1 className="text-center p-3">Inscription à: {event.titre}</h1>
                        <form onSubmit={handleEvent} >
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="nomInput" value={nom} placeholder="Nom" onChange={(e) => setNom(e.target.value)} required />
                                    <label htmlFor="nomInput">Nom</label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="emailInput" value={email} placeholder="Adresse mail" onChange={(e) => setEmail(e.target.value)} required />
                                    <label htmlFor="emailInput">Adresse mail</label>
                                </div>
                            </div>
                            <br />
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="text-center p-3">
                                <button type="submit" className="btn btn-primary text-center" disabled={isSubmitting}> {isSubmitting ? "Inscription en cours..." : "S'inscrire"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}