import type { Route } from "./+types/home";
import { CreateNews } from "../admin/create-news";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Créer une actualité - OpenEventAdmin" },
    { name: "description", content: "Page pour créer une actualité" },
  ];
}

export default function CreateNewsRoute() {
  return <CreateNews />;
}