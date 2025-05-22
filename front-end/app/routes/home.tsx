import type { Route } from "./+types/home";
import { Accueil } from "../public/accueil";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Accueil - OpenEvent" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomeRoute() {
  return <Accueil />;
}
