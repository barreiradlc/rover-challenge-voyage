import { PlateauRepository } from "@/core/repositories/plateau-repository";
import { RoverRepository } from "@/core/repositories/rover-repository";
import { Position } from "@prisma/client";
import { OffBoundaryError } from "../error/useCases/offBoundaryError";
import { PlateauNotFoundError } from "../error/useCases/plateauNotFoundError";
import { SpotUnavailableError } from "../error/useCases/spotUnavailableError";
import { GetFinalPositionService } from "../services/getFinalPositionService";
import { ValidatePlateauBoundariesService } from "../services/validatePlateauBoundaries";
import { VerifySpotAvalabityService } from "../services/verifySpotAvalabityService";

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
      throw new PlateauNotFoundError()
    }

    const validatePlateauBoundariesService = new ValidatePlateauBoundariesService()
    const isInBoundariesLanding = await validatePlateauBoundariesService.execute({
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
      throw new OffBoundaryError()
    }

    const roversByPlateuId = await this.roverRepository.findByPlateuId(plateauId)
    
    const getFinalPositionService = new GetFinalPositionService()
    const destination = await getFinalPositionService.execute({
      landing,
      instruction,
      plateau,
      rovers: roversByPlateuId
    })

    const verifySpotAvalabityService = new VerifySpotAvalabityService()
    const isSpotUnavailableToReach = await verifySpotAvalabityService.execute({
      destinationAxis: {
        xAxis: destination.xAxis,
        yAxis: destination.yAxis
      },
      rovers: roversByPlateuId
    })

    if (roversByPlateuId.length!!) {    
      if (isSpotUnavailableToReach) {
        throw new SpotUnavailableError();      
      }
    }

    const rover = await this.roverRepository.create({ landing, instruction, plateauId, destination })

    if (!rover) {
      throw new Error("Something went wrong!");      
    }

    return rover
  }
}

export { CreateRoverUseCase, CreateRoverUseCaseInterface };
