
import { CreateRoverDTO } from "@/modules/rover/dtos/rover/create-rover-dto";
import { randomUUID } from "node:crypto";
import { RoverEntity } from "../../../modules/rover/entities/rover";
import { RoverRepository } from "../rover-repository";

class InMemoryRoverRepository implements RoverRepository {
  public rovers: RoverEntity[] = [];
  

  async create({ landing, instruction }: CreateRoverDTO): Promise<RoverEntity> {
    const rover: RoverEntity = {
      id: randomUUID(),
      initialPosition: landing,
      instruction
    }

    this.rovers.push(rover)

    return rover
  }
}

export { InMemoryRoverRepository };
