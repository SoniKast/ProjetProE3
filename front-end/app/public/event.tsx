import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import "./styles/base.css";
import { getApiUrl } from "../utils/api";

interface Evenement {
  id: number;
  titre: string;
  description_detail?: string;
  image?: string;
}

export function Event() {
  const { pid } = useParams();
  const [event, setEvent] = useState<Evenement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(getApiUrl(`/api/evenements/${pid}`));
        if (!res.ok) {
          throw new Error("Évènement non trouvé");
        }
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [pid]);

  if (loading) {
    return <div className="container py-5 text-center">Chargement...</div>;
  }

  if (error || !event) {
    return <div className="container py-5 text-center text-danger">{error || "Évènement non trouvé"}</div>;
  }

  return (
    <>
      <div>
        <img src={`header/header${event.id}.png`} className="image-width" width="1920" height="300" />
        <div className="container py-2">
          <div className="row">
            <div className="col-8 p-4">
              <h2>{event.titre}</h2>
              <p>{event.description_detail}</p>
            </div>
            <div className="col-4 border-start p-4">
              <Link className="btn btn-primary bg-gradient" to={`/inscription/${event.id}`}>S'inscrire</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
