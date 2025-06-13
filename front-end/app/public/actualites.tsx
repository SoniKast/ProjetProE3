import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./styles/base.css";

export function Actualites() {
  const { id } = useParams<{ id: string }>();
  const [actualite, setActualite] = useState<Actualite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActualite() {
      try {
        const response = await fetch(`http://localhost:3000/api/news/${id}`);
        if (!response.ok) throw new Error("Erreur lors du chargement de l'actualité");
        const data: Actualite = await response.json();
        setActualite(data);
      } catch (err) {
        setError("Impossible de charger cette actualité.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchActualite();
  }, [id]);

  if (loading) return <div className="container mt-5">Chargement...</div>;
  if (error || !actualite) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-3">{actualite.titre}</h1>
      <p className="text-muted">{new Date(actualite.date_creation).toLocaleDateString()}</p>
      {actualite.image && (
        <img
          src={actualite.image}
          alt={`Image de ${actualite.titre}`}
          className="img-fluid mb-4 rounded"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />
      )}
      <p className="lead">{actualite.description}</p>
    </div>
  );
}
