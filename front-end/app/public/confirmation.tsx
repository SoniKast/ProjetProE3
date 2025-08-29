import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getApiUrl } from "../utils/api";

export function Confirmation() {
  const { token } = useParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    async function confirmInscription() {
      try {
        const res = await fetch(getApiUrl(`/api/confirmation/${token}`));
        if (!res.ok) throw new Error();
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    confirmInscription();
  }, [token]);

  return (
    <div className="container text-center mt-5">
      {status === "loading" && <p>Confirmation en cours...</p>}
      {status === "success" && <h2> Inscription confirmée avec succès !</h2>}
      {status === "error" && <h2> Lien invalide ou déjà utilisé.</h2>}
    </div>
  );
}