import { InMemoryPlateauRepository } from '@/core/repositories/in-memory/in-memory-plateau-repository'
import { InMemoryRoverRepository } from '@/core/repositories/in-memory/in-memory-rover-repository'
import { CreatePlateauDTO } from '@/modules/plateau/dtos/plateau/create-plateau-dto'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateRoverDTO } from '../dtos/rover/create-rover-dto'
import { CardinalPoint } from '../entities/rover'
import { CreateRoverUseCase } from './createRoverUseCase'

let inMemoryRoverRepository: InMemoryRoverRepository
let inMemoryPlateauRepository: InMemoryPlateauRepository
let sut: CreateRoverUseCase

const plateauPayload: CreatePlateauDTO = {
  width: 4,
  height: 4
}

const roverPayload: CreateRoverDTO = {  
  plateauId: "fake-plateau-id",
  landing: {
    xAxis: 4,
    yAxis: 5,
    cardinalPosition: CardinalPoint.S    
  },
  instruction: "LMLMLMLMM"
}

describe("Create Rover useCase", () => {
  beforeEach(() => {
    inMemoryRoverRepository = new InMemoryRoverRepository()
    inMemoryPlateauRepository = new InMemoryPlateauRepository()
    sut = new CreateRoverUseCase(inMemoryPlateauRepository,inMemoryRoverRepository)
  })

  // Finish validations first
  // it('Should be able to create Rover', async () => {
  //   const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
  //   roverPayload.plateauId = plateauId

  //   const rover = await sut.execute(roverPayload)

  //   console.log('rover created')
  //   console.log(rover)

  //   expect(rover.id).toEqual(expect.any(String))
  // })

  it('Should not be able to create Rover without a plateau', async () => {        
    await expect(async() => 
      sut.execute(roverPayload)  
    ).rejects.toBeInstanceOf(Error)        
  })
})