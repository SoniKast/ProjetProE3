import type { Route } from "./+types/home";
import { Recherche } from "../public/recherche";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recherche - OpenEvent" },
    { name: "description", content: "Page de recherche du site OpenEvent" },
  ];
}

export default function RechercheRoute() {
  return <Recherche />;
}