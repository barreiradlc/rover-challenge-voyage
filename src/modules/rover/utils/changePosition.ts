import { PlateauEntity } from "@/modules/plateau/entities/plateau";
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
function handleMoveForward(cardinalPosition: CardinalPoint, rover: Position): Pick<Position, "xAxis" | "yAxis"> {
  let newPosition = {
    yAxis: rover.yAxis,
    xAxis: rover.xAxis,
  }
  
  switch (cardinalPosition) {
    case CardinalPoint.N:
      ++newPosition.yAxis    
      break
    case CardinalPoint.E:
      newPosition.xAxis = rover.xAxis + 1
      break
    case CardinalPoint.S:      
      newPosition.yAxis = newPosition.yAxis - 1
      break
    case CardinalPoint.W:
      newPosition.xAxis = rover.xAxis - 1
      break
  }

  return newPosition
}

function handleChangePosition(command: CommandControl, rover: Position, plateau: PlateauEntity) {    
  switch (command) {
    case CommandControl.L:
      rover.cardinalPosition = handleSpinLeft(rover.cardinalPosition)      
      
      break;
    case CommandControl.R:      
      rover.cardinalPosition =  handleSpinRight(rover.cardinalPosition)
      
      break;
    case CommandControl.M:      
      const newPosition: Pick<Position, "xAxis" | "yAxis"> = handleMoveForward(rover.cardinalPosition, rover)      

      if (newPosition.xAxis === 0 || newPosition.xAxis > plateau.width) {
        console.error("Rover can't go outside plateau horizontal boundaries")
      } else if (newPosition.yAxis === 0 || newPosition.yAxis > plateau.height) {
        console.error("Rover can't go outside plateau vertical boundaries")
      } else {
        rover.xAxis = newPosition.xAxis
        rover.yAxis = newPosition.yAxis
      }

      break;
    default:
      console.error("You should'd be here, please review the code", command);

      break;
  }

  return rover
}

export { handleChangePosition };
