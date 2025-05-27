import type { Route } from "./+types/home";
import { CreateEvent } from "../admin/create-event";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Créer un évènement - OpenEventAdmin" },
    { name: "description", content: "Page pour créer un évènement" },
  ];
}

export default function CreateEventRoute() {
  return <CreateEvent />;
}