import type { Route } from "./+types/home";
import { EventDisplay } from "../admin/event-display";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Évènements - OpenEventAdmin" },
    { name: "description", content: "Page permettant de voir tous les évènements" },
  ];
}

export default function AdminEventsRoute() {
  return <EventDisplay />;
}