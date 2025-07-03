import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
    layout("routes/mainlayout.tsx", [
        index("routes/home.tsx"),
        route("recherche", "routes/recherche.tsx"),
        route("event/:pid", "routes/event.tsx"),
        route("inscription/:pid", "routes/inscription.tsx"),
        route("confirmation/:token", "routes/confirmation.tsx"),
        route("actualites/:pid", "routes/actualites.tsx"),
    ]),

    ...prefix("admin", [ 
        route("login", "routes/login.tsx"),
        
        layout("routes/adminlayout.tsx", [
            index("routes/dashboard.tsx"),
            route("create-event", "routes/create-event.tsx"),
            route("create-news", "routes/create-news.tsx"),
            route("evenements", "routes/admin-events.tsx"),
            route("actualites", "routes/admin-news.tsx"),
            route("inscriptions", "routes/admin-inscriptions.tsx"),
        ]),
    ]),
] satisfies RouteConfig;

