import { PrismaPlateauRepository } from "@/core/repositories/prisma/prisma-plateau-repository";
import { PrismaRoverRepository } from "@/core/repositories/prisma/prisma-rover-repository";
import { CreateRoverUseCase } from "@/modules/rover/useCases/createRoverUseCase";
import { CardinalPoint, Position } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface CreatePlateauControllerInterface {
  plateauId: string,
  landing: {
    xAxis: number,
    yAxis: number,
    cardinalPosition: CardinalPoint
  },
  instruction: string
}

async function createRover(request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaPlateauRepository = new PrismaPlateauRepository()
    const prismaRoverRepository = new PrismaRoverRepository()
    const createRoverUseCase = new CreateRoverUseCase(prismaPlateauRepository, prismaRoverRepository)
    
    const body = request.body as CreatePlateauControllerInterface
    
    const createRoverBodySchema = z.object({
      plateauId: z.string(),      
      instruction: z.string(),    
    });
    
    const createRoverLandingBodySchema = z.object({
      xAxis: z.number(),
      yAxis: z.number(),
      cardinalPosition: z.enum([CardinalPoint.N, CardinalPoint.S, CardinalPoint.W, CardinalPoint.E])
    });
    
    const { instruction, landing, plateauId } = createRoverBodySchema.parse(body) as unknown as CreatePlateauControllerInterface
    const { xAxis, yAxis, cardinalPosition } = createRoverLandingBodySchema.parse(body.landing) as unknown as Position 

    const plateau = await createRoverUseCase.execute({
      instruction,
      landing: {
        xAxis,
        yAxis,
        cardinalPosition
      },
      plateauId
    })

    return reply.status(201).send(plateau)
  } catch (error) {
    return reply.status(500).send(error)  
  }
}

export { createRover };
