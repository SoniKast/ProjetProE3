import type { Route } from "./+types/home";
import { Dashboard } from "../admin/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - OpenEventAdmin" },
    { name: "description", content: "Page de Dashboard" },
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}