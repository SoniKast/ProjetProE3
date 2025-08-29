import type { Route } from "./+types/home";
import { Event } from "../public/event";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Évènement - OpenEvent" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function EventRoute() {
  return <Event />;
}
