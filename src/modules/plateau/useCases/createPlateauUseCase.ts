import { PlateauRepository } from "@/core/repositories/plateau-repository";

interface CreatePlateauRequest {
  width: number;
  height: number
}

class CreatePlateauUseCase {
  constructor(private plateauRepository: PlateauRepository) {}

  async execute({
    width,
    height
  }: CreatePlateauRequest) {

    const plateau = await this.plateauRepository.create({ width, height })

    if (!plateau) {
      throw new Error("Something went wrong!");      
    }

    return plateau
  }
}

export { CreatePlateauUseCase };
