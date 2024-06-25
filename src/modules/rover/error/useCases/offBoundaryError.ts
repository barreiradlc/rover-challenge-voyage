class OffBoundaryError extends Error {
  constructor() {
    super('Rover placed outside plateau boundaries.')
  }
}

export { OffBoundaryError }
