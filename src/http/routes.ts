import { FastifyInstance } from "fastify";
import { createPlateau } from "./controllers/plateu/createPlateau";
import { findPlateau } from "./controllers/plateu/findPlateau";

async function appRoutes(app: FastifyInstance) {
  app.post("/plateau", createPlateau)
  app.get("/plateau/:id", findPlateau)
}

export { appRoutes };
