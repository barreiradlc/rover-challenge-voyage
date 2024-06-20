import { PrismaPlateauRepository } from "@/core/repositories/prisma/prisma-plateau-repository";
import { CreatePlateauUseCase } from "@/modules/plateau/useCases/createPlateauUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

async function createPlateau(request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaPlateauRepository = new PrismaPlateauRepository()
    const createPlateauUseCase = new CreatePlateauUseCase(prismaPlateauRepository)

    const createPlateauBodySchema = z.object({
      width: z.number(),
      height: z.number(),    
    });

    const { width, height } = createPlateauBodySchema.parse(request.body)

    const plateau = await createPlateauUseCase.execute({
      width,
      height
    })

    return reply.status(201).send(plateau)
  } catch (error) {
    return reply.status(500).send(error)  
  }
}

export { createPlateau };
