import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from "../components/authcontext";
import "./styles/login.css";

export function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

    try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, mot_de_passe: password })
            });

            const data = await response.json();
            console.log("Réponse du serveur:", data);

            if (!response.ok) {
                setError(data.message || "Email ou mot de passe invalide");
                return;
            }

            sessionStorage.setItem("token", data.token); // Ceci fait en sorte que l'admin soit déconnecté en quittant le navigateur
            sessionStorage.setItem("email", data.user.email); 

            login(data.token, data.user.email); // via contexte
            navigate("/admin");
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setError("Erreur : " + error);
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            navigate("/admin");
        }
    }, []);
    
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "calc(80vh - 80px)" }}>
                <div className="row w-100">
                    <div className="col-lg-4 mx-auto card p-5 border-secondary border-2">
                        <h1 className="text-center p-3">Connexion</h1>
                        <form onSubmit={handleLogin} >
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="emailInput" value={email} placeholder="Adresse mail" onChange={(e) => setEmail(e.target.value)} required />
                                    <label htmlFor="emailInput">Adresse mail</label>
                                </div>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-key-fill"></i></span>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="passwordInput" value={password} placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} required />
                                    <label htmlFor="passwordInput">Mot de passe</label>
                                </div>
                            </div>
                            <br />
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="text-center p-3">
                                <button type="submit" className="btn btn-primary text-center">Se connecter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}