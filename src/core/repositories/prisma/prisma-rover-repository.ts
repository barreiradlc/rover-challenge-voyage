import { prisma } from "@/lib/prisma";
import { CreateRoverDTO } from "@/modules/rover/dtos/rover/create-rover-dto";
import { RoverEntity } from "../../../modules/rover/entities/rover";
import { RoverRepository } from "../rover-repository";

class PrismaRoverRepository implements RoverRepository {
  public rovers: RoverEntity[] = [];
  

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
