import type { Route } from "./+types/home";
import { Actualites } from "../public/actualites";

interface Actualite {
  id: number;
  titre: string;
  description: string;
  date_creation: string;
  image?: string;
}

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`http://localhost:3000/api/news/${params.pid}`);
  if (!res.ok) throw new Response("Not Found", { status: 404 });
  const data: Actualite = await res.json();
  return data;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Actualités - OpenEvent" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function ActualitesRoute() {
  return <Actualites />;
}
