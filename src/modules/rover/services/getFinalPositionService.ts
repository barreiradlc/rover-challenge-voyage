import { CardinalPoint } from "../entities/rover";
import { handleMoveRover } from "../utils/changePosition";

// TODO, horrible name (find a better one ASAP)
interface ContextRoverDTO {
  landing: {
    xAxis: number;
    yAxis: number;
    cardinalPosition: CardinalPoint 
  }
  instruction: string
}

class GetFinalPositionService {  
  async execute({   
    instruction,
    landing
  }: ContextRoverDTO) {

    const finalPosition = handleMoveRover({ landing, instruction })

    return finalPosition
  }
}

export { ContextRoverDTO, GetFinalPositionService };
