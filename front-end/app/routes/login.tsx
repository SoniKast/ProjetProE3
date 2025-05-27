import type { Route } from "./+types/home";
import { LogIn } from "../admin/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Connexion - OpenEventAdmin" },
    { name: "description", content: "Page de connexion" },
  ];
}

export default function LoginRoute() {
  return <LogIn />;
}