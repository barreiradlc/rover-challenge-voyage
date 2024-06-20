import { FastifyInstance } from "fastify";
import { createPlateau } from "./controllers/plateu/createPlateau";

async function appRoutes(app: FastifyInstance) {
  app.post("/plateau", createPlateau)
}

export { appRoutes };
