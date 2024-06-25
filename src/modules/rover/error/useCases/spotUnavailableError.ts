class SpotUnavailableError extends Error {
  constructor() {
    super('Plateau not found.')
  }
}

export { SpotUnavailableError }
