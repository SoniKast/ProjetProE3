import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
    layout("routes/mainlayout.tsx", [
        index("routes/home.tsx"),
        route("event/:pid", "routes/event.tsx"),
    ]),

    ...prefix("admin", [ 
        layout("routes/adminlayout.tsx", [
        index("routes/dashboard.tsx"),
        route("create-event", "routes/create-event.tsx"),
        route("login", "routes/login.tsx"),
        ]),
    ]),
] satisfies RouteConfig;

