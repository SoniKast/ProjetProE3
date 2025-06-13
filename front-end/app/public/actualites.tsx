import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useLoaderData } from "react-router";
import "./styles/base.css";

export function Actualites() {

  const actualite = useLoaderData() as {
    id: number;
    titre: string;
    description: string;
    date_creation: string;
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">{actualite.titre}</h1>
      <p className="text-muted">{new Date(actualite.date_creation).toLocaleDateString()}</p>
      <p className="lead">{actualite.description}</p>
    </div>
  );
}
