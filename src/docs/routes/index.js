import { eventRoutes } from "./events.js";
import { healthRoutes } from "./health.js";

export const allRoutes = {
  ...healthRoutes,
  ...eventRoutes,
};
