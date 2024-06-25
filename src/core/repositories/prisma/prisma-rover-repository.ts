import { prisma } from "@/lib/prisma";
import { CreateRoverDTO } from "@/modules/rover/dtos/rover/create-rover-dto";
import { RoverEntity } from "../../../modules/rover/entities/rover";
import { RoverRepository } from "../rover-repository";

class PrismaRoverRepository implements RoverRepository {  
  async findByPlateuId(plateauId: string): Promise<RoverEntity[]> {
    const roversByPLateauId = await prisma.rover.findMany({
      where: {
        plateauId
      },
      select: {
        id: true,
        finalPosition: true,
        initialPosition: true,
        instruction: true,
        plateauId: true,
        initialPositionId: true,
        finalPositionId: true
      }
    })

    return roversByPLateauId;
  }

  async create({ landing, instruction, destination, plateauId }: CreateRoverDTO): Promise<RoverEntity> {
    const initialPosition = await prisma.position.create({ data: landing })
    const finalPosition = await prisma.position.create({ data: destination })

    const rover = await prisma.rover.create({
      data: {
        initialPositionId: initialPosition.id,
        finalPositionId: finalPosition.id,
        instruction,
        plateauId
      }
    })

    return {
      ...rover,
      initialPosition,
      finalPosition
    }
  }
}

export { PrismaRoverRepository };
