import { CardinalPoint } from "@prisma/client";

interface Position {
  xAxis: number
  yAxis: number
  cardinalPosition: CardinalPoint
}

export enum CommandControl {
  L = 'L',
  R = 'R',
  M = 'M',
}

interface RoverEntity {
  id: string;  
  plateauId: string
  initialPosition: Position,
  finalPosition: Position,
  instruction: string
}


export { CardinalPoint, RoverEntity };

