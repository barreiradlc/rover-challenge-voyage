import { RoverEntity } from "../entities/rover";

interface VerifySpotAvalabityServiceDTO {
  destinationAxis: {
    xAxis: number;
    yAxis: number;
  };
  rovers: RoverEntity[]
}

class VerifySpotAvalabityService {
  async execute({ destinationAxis, rovers }: VerifySpotAvalabityServiceDTO) {
    const isSpotOccupied = rovers.some((rover) => {
      const roverFinalPosition = rover.finalPosition

      return roverFinalPosition.xAxis === destinationAxis.xAxis && roverFinalPosition.yAxis === destinationAxis.yAxis
    })
  
    return isSpotOccupied
  }
}

export { VerifySpotAvalabityService };

  
