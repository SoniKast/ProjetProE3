import { useState } from "react";
import "./styles/login.css";

export function CreateNews() {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleEvent = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

    try {
            const response = await fetch("http://localhost:3000/api/news", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titre, description})
            });

            const data = await response.json();
            console.log("Réponse du serveur:", data);

            if (!response.ok) {
                setError(data.message || "Problème dans la création de l'actualité.");
                return;
            }

        } catch (error) {
            console.error("Erreur lors de la création de l'actualité:", error);
            setError("Erreur : " + error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="w-75 my-5 mx-auto card p-5 border-secondary border-2">
                    <h1 className="text-center p-3">Créer une actualité</h1>
                    <form onSubmit={handleEvent} >
                        <div className="input-group mb-3">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="titreInput" value={titre} placeholder="Adresse mail" onChange={(e) => setTitre(e.target.value)} required />
                                <label htmlFor="titreInput">Titre</label>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <div className="form-floating">
                                <textarea className="form-control" id="descriptionInput" value={description} placeholder="Résumé" onChange={(e) => setDescription(e.target.value)} required />
                                <label htmlFor="descriptionInput">Résumé</label>
                            </div>
                        </div>
                        <br />
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="text-center p-3">
                            <button type="submit" className="btn btn-primary text-center">Créer une actualité</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}