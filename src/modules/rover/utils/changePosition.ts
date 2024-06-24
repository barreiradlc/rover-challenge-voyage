import { CardinalPoint, Position } from "@prisma/client";
import { CommandControl } from "../entities/rover";

/* 
  * N > W
  * W > S
  * S > E
  * E > N
*/
function handleSpinLeft(cardinalPosition: CardinalPoint): CardinalPoint {
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

/* 
  * N > E
  * E > S
  * S > W
  * W > N
*/
function handleSpinRight(cardinalPosition: CardinalPoint): CardinalPoint {
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

/*
 *  xAxis     == x
 *  yAxis    == y
 * 
  * N > y++ 
  * E > x++
  * S > y--
  * W > x--   
*/
function handleMoveForward(cardinalPosition: CardinalPoint, rover: Position): Partial<Position> {
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

export { handleChangePosition };
