import { PlateauRepository } from "@/core/repositories/plateau-repository";

class FindPlateauUseCase {
  constructor(private plateauRepository: PlateauRepository) {}

  async execute(id: string) {  
    const plateau = await this.plateauRepository.find(id)

    console.log(plateau)

    if (!plateau) {
      throw new Error("Coundn't find the plateau, verify the id!");      
    }
    
    return plateau    
  }
}

export { FindPlateauUseCase };
