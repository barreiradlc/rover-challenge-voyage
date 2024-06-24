import { ContextRoverDTO } from "../services/getFinalPositionService";

enum CardinalPoint {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W',
}

interface Position {
  xAxis: number;
  yAxis: number;
  cardinalPosition: CardinalPoint;
}

enum CommandControl {
  L = 'L',
  R = 'R',
  M = 'M',
}

function handleSpinLeft(cardinalPosition: CardinalPoint): CardinalPoint {
  /* 
        N > W
        W > S
        S > E
        E > N
    */
  switch (cardinalPosition) {
    case CardinalPoint.N:
      return CardinalPoint.W;
    case CardinalPoint.W:
      return CardinalPoint.S;
    case CardinalPoint.S:
      return CardinalPoint.E;
    case CardinalPoint.E:
      return CardinalPoint.N;
  }
}

function handleSpinRight(cardinalPosition: CardinalPoint): CardinalPoint {
  /* 
        N > E
        E > S
        S > W
        W > N
    */
  switch (cardinalPosition) {
    case CardinalPoint.N:
      return CardinalPoint.E;
    case CardinalPoint.E:
      return CardinalPoint.S;
    case CardinalPoint.S:
      return CardinalPoint.W;
    case CardinalPoint.W:
      return CardinalPoint.N;
  }
}

function handleMoveForward(cardinalPosition: CardinalPoint, rover: Position): Partial<Position> {
  /**
   *  xAxis     == x
   *  yAxis    == y
   */

  /* 
        N > y++ 
        E > x++
        S > y--
        W > x--
    */
  switch (cardinalPosition) {
    case CardinalPoint.N:
      return { yAxis: ++rover.yAxis };
    case CardinalPoint.E:
      return { xAxis: ++rover.xAxis };
    case CardinalPoint.S:
      return { yAxis: --rover.yAxis };
    case CardinalPoint.W:
      return { xAxis: --rover.xAxis };
  }
}

function handleChangePosition(command: CommandControl, rover: Position) {
  switch (command) {
    case CommandControl.L:
      rover.cardinalPosition = handleSpinLeft(rover.cardinalPosition);

      break;
    case CommandControl.R:
      rover.cardinalPosition = handleSpinRight(rover.cardinalPosition);

      break;
    case CommandControl.M:
      const newPosition = handleMoveForward(rover.cardinalPosition, rover);

      rover = {
        ...rover,
        ...newPosition,
      };

      break;
    default:
      console.error("You should'd be here, please review the code", command);

      break;
  }

  return rover
}

interface RoverPosition {
  xAxis: number
  yAxis: number
  cardinalPosition: CardinalPoint
}

function handleMoveRover({ landing, instruction }: ContextRoverDTO) {
  let destination: RoverPosition = landing

  const command = instruction.split('') as CommandControl[]

  command.forEach((position: CommandControl) => {
    const key: keyof typeof CommandControl = position;
    const inputPosition = CommandControl[key];

    destination = handleChangePosition(inputPosition, destination);
  });


  return destination
}

export { handleMoveRover };
