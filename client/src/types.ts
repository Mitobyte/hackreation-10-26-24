const _routes = ["root"] as const;
export type Route = (typeof _routes)[number];
