import { CreateRoverDTO } from "@/modules/rover/dtos/rover/create-rover-dto";
import { RoverEntity } from "@/modules/rover/entities/rover";

interface RoverRepository {
  create(data: CreateRoverDTO): Promise<RoverEntity>  
}

export { RoverRepository };
