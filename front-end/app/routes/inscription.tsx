import type { Route } from "./+types/home";
import { Inscription } from "../public/inscription";
import { getApiUrl } from "../utils/api";

interface Evenement {
  id: number;
  titre: string;
  description?: string;
  image?: string;
}

export async function loader({ params }: Route.LoaderArgs) {
  const pid = (params as { pid: string }).pid;
  const res = await fetch(getApiUrl(`/api/evenements/${pid}`));
  if (!res.ok) throw new Response("Not Found", { status: 404 });
  const data: Evenement = await res.json();
  return data;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inscription à un évènement - OpenEvent" },
    { name: "description", content: "Inscription à un évènement" },
  ];
}

export default function InscriptionRoute() {
  return <Inscription />;
}