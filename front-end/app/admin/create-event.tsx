import { useState } from "react";
import "./styles/login.css";

export function CreateEvent() {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionDetail, setDescriptionDetail] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [error, setError] = useState('');
    const [categorie, setCategorie] = useState('');
    const [emplacement, setEmplacement] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleEvent = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

    if(dateDebut > dateFin)
    {
        setError("La date de début est après la date de fin.");
    }
    else
    {
        try {
            const response = await fetch("http://localhost:3000/api/evenements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titre, description, description_detail: descriptionDetail, date_debut: dateDebut, date_fin: dateFin, categorie, emplacement })
            });

            const data = await response.json();
            console.log("Réponse du serveur:", data);

            if (!response.ok) {
                setError(data.message || "Problème dans la création de l'évènement.");
                return;
            }

            const eventId = data.id; 

            if (file) {
                const formData = new FormData();
                const filename = `header${eventId}.png`;
                formData.append("image", file, filename);

                const uploadResponse = await fetch("http://localhost:3000/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await uploadResponse.json();
                if (!uploadResponse.ok) {
                    setError(uploadData.message || "Erreur lors de l'upload de l'image.");
                    return;
                }

                console.log("Image uploadée:", uploadData);
            }

            } catch (error) {
                console.error("Erreur lors de la création de l'évènement:", error);
                setError("Erreur : " + error);
            }
        }
    }

    return (
        <>
            <div className="container">
                    <div className="w-75 my-5 mx-auto card p-5 border-secondary border-2">
                        <h1 className="text-center p-3">Créer un évènement</h1>
                        <form onSubmit={handleEvent} >
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="titreInput" value={titre} placeholder="Adresse mail" onChange={(e) => setTitre(e.target.value)} required />
                                    <label htmlFor="titreInput">Titre</label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="descriptionInput" value={description} placeholder="Résumé" onChange={(e) => setDescription(e.target.value)} required />
                                    <label htmlFor="descriptionInput">Résumé</label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <textarea className="form-control" id="descriptionDetailInput" value={descriptionDetail} placeholder="Description détaillée" onChange={(e) => setDescriptionDetail(e.target.value)} required />
                                    <label htmlFor="descriptionDetailInput">Description détaillée</label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type="date" className="form-control" id="dateDebutInput" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
                                    <label htmlFor="dateDebutInput">Date de début</label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type="date" className="form-control" id="dateFinInput" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
                                    <label htmlFor="dateFinInput">Date de fin</label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="categorieInput" value={categorie} placeholder="Catégorie" onChange={(e) => setCategorie(e.target.value)} required />
                                    <label htmlFor="categorieInput">Catégorie</label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="emplacementInput" value={emplacement} placeholder="Emplacement" onChange={(e) => setEmplacement(e.target.value)} required />
                                    <label htmlFor="emplacementInput">Emplacement</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image de header (format 16:9 préféré)</label>
                                <input type="file" className="form-control" id="image" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
                            </div>
                            <br />
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="text-center p-3">
                                <button type="submit" className="btn btn-primary text-center">Créer un évènement</button>
                            </div>
                        </form>
                    </div>
            </div>
        </>
    )
}