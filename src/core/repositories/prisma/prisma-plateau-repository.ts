import { prisma } from "@/lib/prisma";
import { CreatePlateauDTO } from "@/modules/plateau/dtos/plateau/create-plateau-dto";
import { PlateauEntity } from "@/modules/plateau/entities/plateau";
import { PlateauRepository } from "../plateau-repository";

class PrismaPlateauRepository implements PlateauRepository {
  public plateaus: PlateauEntity[] = [];
  
  async find(id: string): Promise<PlateauEntity | undefined | null> {
    const plateau = await prisma.plateau.findUnique({ where: { id } })

    return plateau;
  }

  async create({ width, height }: CreatePlateauDTO): Promise<PlateauEntity> {
    const plateau = await prisma.plateau.create({ 
      data: { 
        width,
        height
      }
     })
    
    return plateau
  }
}

export { PrismaPlateauRepository };
