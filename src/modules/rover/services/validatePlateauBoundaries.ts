interface ValidatePlateauBoundariesServiceDTO {
  plateauAxis: {
    xAxis: number;
    yAxis: number;
  };
  roverAxis: {
    xAxis: number;
    yAxis: number;
  };
}

class ValidatePlateauBoundariesService {
  async execute({ plateauAxis, roverAxis }: ValidatePlateauBoundariesServiceDTO) {
    const isInXBoundaries = plateauAxis.xAxis >= roverAxis.xAxis
    const isInYBoundaries = plateauAxis.yAxis >= roverAxis.yAxis
  
    return isInXBoundaries && isInYBoundaries
  }
}

export { ValidatePlateauBoundariesService };

  
