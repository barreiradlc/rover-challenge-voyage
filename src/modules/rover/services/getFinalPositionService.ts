import { PlateauEntity } from "@/modules/plateau/entities/plateau";
import { Position } from "@prisma/client";
import { CommandControl } from "../entities/rover";
import { handleChangePosition } from "../utils/changePosition";

interface GetFinalPositionServiceDTO {
  landing: Position
  instruction: string
  plateau: PlateauEntity
}

class GetFinalPositionService {  
  async execute({   
    instruction,
    landing,
    plateau
  }: GetFinalPositionServiceDTO) {
    let finalPosition: Position = landing

    const command = instruction.split('') as CommandControl[]

    command.forEach((position: CommandControl) => {
      const key: keyof typeof CommandControl = position;
      const inputPosition = CommandControl[key];

      finalPosition = handleChangePosition(inputPosition, finalPosition, plateau);
    });

    return finalPosition
  }
}

export { GetFinalPositionService, GetFinalPositionServiceDTO };

