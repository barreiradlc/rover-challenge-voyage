import { PlateauEntity } from "@/modules/plateau/entities/plateau";
import { CreatePlateauDTO } from "../../modules/plateau/dtos/plateau/create-plateau-dto";

interface PlateauRepository {
  create(data: CreatePlateauDTO): Promise<PlateauEntity>
}

export { PlateauRepository };
