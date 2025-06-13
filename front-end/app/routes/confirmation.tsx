import type { Route } from "./+types/home";
import { Confirmation } from "../public/confirmation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Confirmation - OpenEvent" },
    { name: "description", content: "" },
  ];
}

export default function ConfirmationRoute() {
  return <Confirmation />;
}