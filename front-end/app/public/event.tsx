import { Link } from "react-router";
import { useLoaderData } from "react-router";
import "./base.css";

export function meta({ data }: { data: { titre: string } }) {
  return [{ title: `${data.titre} - OpenEvent` }];
}

export function Event() {
  const event = useLoaderData() as {
    id: number;
    titre: string;
    description_detail?: string;
    image?: string;
  };

    return (
        <>
            <div>
                <img src={`/placeholder${event.id}.png`} className="image-width" width="1920" height="300" />
                <div className="container py-2">
                    <div className="row">
                        <div className="col-8 p-4">
                            <h2>{event.titre}</h2>
                            <p>{event.description_detail}</p>
                        </div>
                        <div className="col-4 border-start p-4">
                            <button className="btn btn-primary bg-gradient">S'inscrire</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}