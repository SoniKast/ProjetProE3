import type { Route } from "./+types/home";
import { NewsDisplay } from "../admin/news-display";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Actualités - OpenEventAdmin" },
    { name: "description", content: "Page permettant de voir toutes les actualités" },
  ];
}

export default function AdminNewsRoute() {
  return <NewsDisplay />;
}