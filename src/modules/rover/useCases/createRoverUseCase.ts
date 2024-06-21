import { PlateauRepository } from "@/core/repositories/plateau-repository";
import { RoverRepository } from "@/core/repositories/rover-repository";
import { CreateRoverDTO } from "../dtos/rover/create-rover-dto";
import { validateAxisFit } from "../services/validatePlateauBoundaries";


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

    const isInBoundaries = validateAxisFit({
      plateauAxis: {
        xAxis: plateau?.width,
        yAxis: plateau?.height,
      },
      roverAxis: {
        xAxis: landing.xAxis,
        yAxis: landing.yAxis,
      }
    })

    if (!isInBoundaries) {
      throw new Error("The Rover can't land outside the plateau")
    }

    const rover = await this.roverRepository.create({ landing, instruction, plateauId })

    if (!rover) {
      throw new Error("Something went wrong!");      
    }

    return rover
  }
}

export { CreateRoverUseCase };
