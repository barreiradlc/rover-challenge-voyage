import { FastifyInstance } from "fastify";
import { createPlateau } from "./controllers/plateu/createPlateau";
import { findPlateau } from "./controllers/plateu/findPlateau";
import { createRover } from "./controllers/rover/createRover";

async function appRoutes(app: FastifyInstance) {
  // Plateu Routes
  app.post("/plateau", createPlateau)
  app.get("/plateau/:id", findPlateau)

  // Rover Routes
  app.post("/rover", createRover)
}

export { appRoutes };
