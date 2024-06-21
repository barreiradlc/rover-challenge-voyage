import { CardinalPoint } from "../../entities/rover";

interface CreateRoverDTO {
  // TODO, inpout the data to insert rover
  plateauId: string
  landing: {
    xAxis: number,
    yAxis: number,
    cardinalPosition: CardinalPoint
  },
  instruction: string
}

export { CreateRoverDTO };
