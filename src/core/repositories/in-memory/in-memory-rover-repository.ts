
import { CreateRoverDTO } from "@/modules/rover/dtos/rover/create-rover-dto";
import { randomUUID } from "node:crypto";
import { RoverEntity } from "../../../modules/rover/entities/rover";
import { RoverRepository } from "../rover-repository";

class InMemoryRoverRepository implements RoverRepository {
  public rovers: RoverEntity[] = [];
  
  async findByPlateuId(plateauId: string): Promise<RoverEntity[]> {
    const roversByPlateuId = this.rovers.filter(( rover ) => rover.plateauId === plateauId)

    return roversByPlateuId
  }

  async create({ landing, instruction, destination, plateauId }: CreateRoverDTO): Promise<RoverEntity> {
    const rover: RoverEntity = {
      id: randomUUID(),
      initialPosition: landing,
      finalPosition: destination,
      plateauId,
      instruction
    }

    this.rovers.push(rover)

    return rover
  }
}

export { InMemoryRoverRepository };
