interface Bourdaries {
  plateauAxis: {
    xAxis: number;
    yAxis: number;
  };
  roverAxis: {
    xAxis: number;
    yAxis: number;
  };
}

function validateAxisFit({ plateauAxis, roverAxis }: Bourdaries) {
  const isInXBoundaries = plateauAxis.xAxis >= roverAxis.xAxis
  const isInYBoundaries = plateauAxis.yAxis >= roverAxis.yAxis
  
  return isInXBoundaries && isInYBoundaries
}

export { validateAxisFit };
