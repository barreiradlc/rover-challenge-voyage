class PlateauNotFoundError extends Error {
  constructor() {
    super('Plateau not found.')
  }
}

export { PlateauNotFoundError }
