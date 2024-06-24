import { InMemoryPlateauRepository } from '@/core/repositories/in-memory/in-memory-plateau-repository'
import { InMemoryRoverRepository } from '@/core/repositories/in-memory/in-memory-rover-repository'
import { CreatePlateauDTO } from '@/modules/plateau/dtos/plateau/create-plateau-dto'
import { CardinalPoint } from '../entities/rover'
import { CreateRoverUseCase, CreateRoverUseCaseInterface } from './createRoverUseCase'

let inMemoryRoverRepository: InMemoryRoverRepository
let inMemoryPlateauRepository: InMemoryPlateauRepository
let sut: CreateRoverUseCase

const plateauPayload: CreatePlateauDTO = {
  width: 4,
  height: 4
}

const roverPayload: CreateRoverUseCaseInterface = {  
  plateauId: "fake-plateau-id",
  landing: {
    xAxis: 4,
    yAxis: 4,
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

  it('Should be able to create Rover', async () => {
    const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
    roverPayload.plateauId = plateauId

    const rover = await sut.execute(roverPayload)

    expect(rover.id).toEqual(expect.any(String))
  })

  it('Should not be able to create Rover without a plateau', async () => {
    await expect(async() => 
      sut.execute(roverPayload)  
    ).rejects.toBeInstanceOf(Error)        
  })

  it('Should not be able to create Rover without landing inside the plateau x-Axis', async () => {        
    const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
    
    await expect(async() => 
      sut.execute({
        instruction: roverPayload.instruction,
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          xAxis: 5
        }
      })  
    ).rejects.toBeInstanceOf(Error)        
  })

  it('Should not be able to create Rover without landing inside the plateau y-Axis', async () => {        
    const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)    

    await expect(async() => 
      sut.execute({
        instruction: roverPayload.instruction,
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          yAxis: 5
        }
      })  
    ).rejects.toBeInstanceOf(Error)        
  })

  it('Should be able to match Documentation values', async () => {    
    /*
      ### Example 1

      Landing Position: 1 2 N \
      Instruction: LMLMLMLMM \
      Final Position: 1 3 N

      ### Example 2
      Landing Position: 3 3 E \
      Instruction: MRRMMRMRRM \
      Final Position: 2 3 S
    */

    const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
    roverPayload.plateauId = plateauId

    const roverExample1 = await sut.execute({
      ...roverPayload,
      landing: {
        xAxis: 1,
        yAxis: 2,
        cardinalPosition: CardinalPoint.N
      },
      instruction: "LMLMLMLMM"
    })

    const roverExample2 = await sut.execute({
      ...roverPayload,
      landing: {
        xAxis: 3,
        yAxis: 3,
        cardinalPosition: CardinalPoint.E
      },
      instruction: "MRRMMRMRRM"
    })
    
    const roverExample1FinalPosition = roverExample1.finalPosition
    const roverExample2FinalPosition = roverExample2.finalPosition

    expect(roverExample1FinalPosition.xAxis).toEqual(1)
    expect(roverExample1FinalPosition.yAxis).toEqual(3)
    expect(roverExample1FinalPosition.cardinalPosition).toEqual(CardinalPoint.N)

    expect(roverExample2FinalPosition.xAxis).toEqual(2)
    expect(roverExample2FinalPosition.yAxis).toEqual(3)
    expect(roverExample2FinalPosition.cardinalPosition).toEqual(CardinalPoint.S)
  })
})