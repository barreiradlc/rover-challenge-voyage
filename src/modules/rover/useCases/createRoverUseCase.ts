import { PlateauRepository } from "@/core/repositories/plateau-repository";
import { RoverRepository } from "@/core/repositories/rover-repository";
import { Position } from "@prisma/client";
import { GetFinalPositionService } from "../services/getFinalPositionService";
import { validateAxisFitLanding } from "../services/validatePlateauBoundaries";

interface CreateRoverUseCaseInterface{
  plateauId: string
  landing: Position,
  instruction: string
}

class CreateRoverUseCase {
  constructor(
    private plateauRepository: PlateauRepository,
    private roverRepository: RoverRepository,
  ) { }

  async execute({
    landing,
    instruction,
    plateauId
  }: CreateRoverUseCaseInterface) {
    const plateau = await this.plateauRepository.find(plateauId)    


    if (!plateau) {
      throw new Error("Plateau not found")
    }

    const isInBoundariesLanding = validateAxisFitLanding({
      plateauAxis: {
        xAxis: plateau?.width,
        yAxis: plateau?.height,
      },
      roverAxis: {
        xAxis: landing.xAxis,
        yAxis: landing.yAxis,
      }
    })

    if (!isInBoundariesLanding) {
      throw new Error("The Rover can't land outside the plateau")
    }

    const getFinalPositionService = new GetFinalPositionService()
    const destination = await getFinalPositionService.execute({
      landing,
      instruction,
      plateau
    })

    // const isInBoundariesDestination = validateAxisFitReachingDestination({
    //   plateauAxis: {
    //     xAxis: plateau?.width,
    //     yAxis: plateau?.height,
    //   },
    //   roverAxis: {
    //     xAxis: landing.xAxis,
    //     yAxis: landing.yAxis,
    //   }
    // })

    // if (!isInBoundariesDestination) {
    //   throw new Error("The Rover can't reach outside the plateau")
    // }

    const rover = await this.roverRepository.create({ landing, instruction, plateauId, destination })

    if (!rover) {
      throw new Error("Something went wrong!");      
    }

    return rover
  }
}

export { CreateRoverUseCase, CreateRoverUseCaseInterface };
