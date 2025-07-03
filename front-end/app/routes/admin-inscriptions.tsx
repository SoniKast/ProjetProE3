import type { Route } from "./+types/home";
import { InscriptionDisplay } from "../admin/inscription-display";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inscriptions - OpenEventAdmin" },
    { name: "description", content: "Page permettant de voir toutes les inscriptions" },
  ];
}

export default function AdminInscriptionsRoute() {
  return <InscriptionDisplay />;
}