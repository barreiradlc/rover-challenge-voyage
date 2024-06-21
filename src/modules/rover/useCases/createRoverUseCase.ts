import { PlateauRepository } from "@/core/repositories/plateau-repository";
import { RoverRepository } from "@/core/repositories/rover-repository";
import { CreateRoverDTO } from "../dtos/rover/create-rover-dto";

class CreateRoverUseCase {
  constructor(
    private plateauRepository: PlateauRepository,
    private roverRepository: RoverRepository,
  ) { }

  async execute({
    landing,
    instruction,
    plateauId
  }: CreateRoverDTO) {
    const plateau = await this.plateauRepository.find(plateauId)    

    if (!plateau) {
      throw new Error("Plateau not found")
    }

    const rover = await this.roverRepository.create({ landing, instruction, plateauId })

    if (!rover) {
      throw new Error("Something went wrong!");      
    }

    return rover
  }
}

export { CreateRoverUseCase };
