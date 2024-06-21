import { PrismaPlateauRepository } from "@/core/repositories/prisma/prisma-plateau-repository";
import { FindPlateauUseCase } from "@/modules/plateau/useCases/FindPlateauUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

async function findPlateau(request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaPlateauRepository = new PrismaPlateauRepository()
    const findPlateauUseCase = new FindPlateauUseCase(prismaPlateauRepository)

    const findPlateauBodySchema = z.object({ id: z.string() });

    const { id } = findPlateauBodySchema.parse(request.params)

    const plateau = await findPlateauUseCase.execute(id)

    return reply.status(200).send(plateau)
  } catch (error) {
    return reply.status(500).send(error)  
  }
}

export { findPlateau };
