interface Position {
  xAxis: number
  yAxis: number
  cardinalPosition: CardinalPoint  
}

enum CardinalPoint {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W',
}

interface RoverEntity {
  // TODO, input the correct typing
  id: string;  
  initialPosition: Position,
  instruction: string
}


export { CardinalPoint, RoverEntity };

