import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/home.tsx"),
        route("event/:pid", "routes/event.tsx")
    ]),
] satisfies RouteConfig;
