import "./styles/admin.css";
import StatCard from '../components/statcard';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Evenement {
    id: number;
    titre: string;
    description: string;
    date_debut: string;
    date_fin: string;
    categorie: string;
}

interface Actualite {
  id: number;
  titre: string;
  description: string;
  date_creation: string;
  image?: string;
}

interface Inscriptions {
  id: number;
  nom: string;
  email: string;
  date_inscription: string;
}

interface EventStat {
  mois: string;
  count: number;
}

interface EvenementAvecDuree extends Evenement {
  duree: number;
}

interface Stats {
  aVenir: number;
  passes: number;
  moyenneDuree: number | string;
  parMois: EventStat[];
  topLongs: EvenementAvecDuree[];
  topCourts: EvenementAvecDuree[];
}

export function Dashboard() {
    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const [actualites, setActualites] = useState<Actualite[]>([]);
    const [inscriptions, setInscriptions] = useState<Inscriptions[]>([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState<Stats>({
        aVenir: 0,
        passes: 0,
        moyenneDuree: 0,
        parMois: [],
        topLongs: [],
        topCourts: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resEvents, resNews, resInscr] = await Promise.all([
                    fetch('http://localhost:3000/api/evenements'),
                    fetch('http://localhost:3000/api/news'),
                    fetch('http://localhost:3000/api/inscriptions')
                ]);

                const events: Evenement[] = await resEvents.json();
                const news: Actualite[] = await resNews.json();
                const inscr: Inscriptions[] = await resInscr.json();

                setEvenements(events);
                setActualites(news);
                setInscriptions(inscr);

                const now = new Date();

                const aVenir = events.filter(e => new Date(e.date_debut) > now).length;
                const passes = events.filter(e => new Date(e.date_fin) < now).length;

                const durees = events.map(e =>
                    (new Date(e.date_fin).getTime() - new Date(e.date_debut).getTime()) / 3600000
                );

                const moyenneDuree = durees.length
                    ? (durees.reduce((a, b) => a + b, 0) / durees.length).toFixed(1)
                    : 0;

                const eventsByMonth : { [key: string]: number } = {};
                events.forEach(e => {
                    const d = new Date(e.date_debut);
                    const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
                    eventsByMonth[key] = (eventsByMonth[key] || 0) + 1;
                });

                const parMois = Object.entries(eventsByMonth).map(([mois, count]) => ({
                    mois,
                    count
                }));

                const sorted = [...events].map(e => ({
                    ...e,
                    duree: (new Date(e.date_fin).getTime() - new Date(e.date_debut).getTime()) / 3600000
                }));

                const topLongs = sorted.sort((a, b) => b.duree - a.duree).slice(0, 3);
                const topCourts = sorted.sort((a, b) => a.duree - b.duree).slice(0, 3);

                setStats({
                    aVenir,
                    passes,
                    moyenneDuree,
                    parMois,
                    topLongs,
                    topCourts
                });

            } catch (err) {
                console.error("Erreur de chargement des données", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="main-page"><center>Chargement des données...</center></div>;

    return (
        <>
            <div className="container-fluid bg-light p-3 border border-2 rounded m-4">
                <h1 className="mb-4">Accueil</h1>
                    <div className="row g-4 mb-4">
                        <StatCard value={inscriptions.length} label="Inscriptions" color="primary" linkTo="/monitoring" />
                        <StatCard value={actualites.length} label="Actualités" color="danger" linkTo="/incidents" />
                        <StatCard value={evenements.length} label="Événements" color="dark" linkTo="/utilisateurs" />
                        <StatCard value={stats.aVenir} label="À venir" color="success" linkTo="/" />
                        <StatCard value={stats.passes} label="Passés" color="secondary" linkTo="/" />
                        <StatCard value={`${stats.moyenneDuree} h`} label="Durée moyenne" color="info" linkTo="/" />
                    </div>

                    <h4 className="mt-4 mb-2">Événements par mois</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.parMois}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mois" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>

                <div className="row mt-5">
                    <div className="col-md-6">
                        <h5>Top 3 événements les plus longs</h5>
                        <ul className="list-group">
                            {stats.topLongs.map((e, i) => (
                                <li key={i} className="list-group-item">
                                    {new Date(e.date_debut).toLocaleDateString()} → {new Date(e.date_fin).toLocaleDateString()} : {e.duree.toFixed(1)}h
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-6">
                    <h5>Top 3 événements les plus courts</h5>
                    <ul className="list-group">
                        {stats.topCourts.map((e, i) => (
                            <li key={i} className="list-group-item">
                                {new Date(e.date_debut).toLocaleDateString()} → {new Date(e.date_fin).toLocaleDateString()} : {e.duree.toFixed(1)}h
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
        </>
    );
}