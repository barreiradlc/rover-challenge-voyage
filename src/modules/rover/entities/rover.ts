import { CardinalPoint } from "@prisma/client";

interface Position {
  xAxis: number
  yAxis: number
  cardinalPosition: CardinalPoint
}

interface RoverEntity {
  // TODO, input the correct typing
  id: string;  
  plateauId: string
  initialPosition: Position,
  finalPosition: Position,
  instruction: string
}


export { CardinalPoint, RoverEntity };

