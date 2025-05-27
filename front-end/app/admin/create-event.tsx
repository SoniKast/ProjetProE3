import { useState, useRef, useEffect } from "react";
import Sidebar from "~/components/sidebar";
import "./styles/login.css";
import { Datepicker } from "~/components/datepicker";

export function CreateEvent() {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionDetail, setDescriptionDetail] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [categorie, setCategorie] = useState('');
    const [error, setError] = useState('');

    const handleEvent = (async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");
    })

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 80px)" }}>
                <div className="row w-100">
                    <div className="col-lg-4 mx-auto card p-5 border-secondary border-2">
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
                                </div>
                            </div>
                            <br />
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="text-center p-3">
                                <button type="submit" className="btn btn-primary text-center">Créer un évènement</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}