import { CreatePlateauDTO } from "@/modules/plateau/dtos/plateau/create-plateau-dto";
import { PlateauEntity } from "@/modules/plateau/entities/plateau";
import { randomUUID } from "node:crypto";
import { PlateauRepository } from "../plateau-repository";

class InMemoryPlateauRepository implements PlateauRepository {
  public plateaus: PlateauEntity[] = [];

  async create({ width, height }: CreatePlateauDTO): Promise<PlateauEntity> {
    const plateau: PlateauEntity = {
      id: randomUUID(),
      width,
      height
    }

    this.plateaus.push(plateau)

    return plateau
  }
}

export { InMemoryPlateauRepository };
