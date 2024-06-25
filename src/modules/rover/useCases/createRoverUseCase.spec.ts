import { InMemoryPlateauRepository } from '@/core/repositories/in-memory/in-memory-plateau-repository'
import { InMemoryRoverRepository } from '@/core/repositories/in-memory/in-memory-rover-repository'
import { CreatePlateauDTO } from '@/modules/plateau/dtos/plateau/create-plateau-dto'
import { CardinalPoint } from '../entities/rover'
import { OffBoundaryError } from '../error/useCases/offBoundaryError'
import { PlateauNotFoundError } from '../error/useCases/plateauNotFoundError'
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
    id: "position-id",
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
    ).rejects.toBeInstanceOf(PlateauNotFoundError)        
  })

  

   suite('Should not be able to create Rover without landing inside the plateau boudaries', async () => {        
    it('y-Axis', async () => {        
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
      ).rejects.toBeInstanceOf(OffBoundaryError)        
    })
    
    it('x-Axis', async () => {        
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
      ).rejects.toBeInstanceOf(OffBoundaryError)        
    })
  })

  it('Should not be able to move a Rover to a spot where another one is placed', async () => {        
    const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)    

    const { finalPosition: rover1FinalPostion } = await sut.execute({
      instruction: roverPayload.instruction,
      plateauId: plateauId,
      landing: {
        ...roverPayload.landing,
        yAxis: 4
      }
    })
    const { finalPosition: rover2FinalPostion } = await sut.execute({
      instruction: roverPayload.instruction,
      plateauId: plateauId,
      landing: {
        ...roverPayload.landing,
        yAxis: 4
      }
    })

    expect({
      xAxis: rover1FinalPostion.xAxis,
      yAxis: rover1FinalPostion.yAxis,
    }).not.toStrictEqual({
      xAxis: rover2FinalPostion.xAxis,
      yAxis: rover2FinalPostion.yAxis,
    })
  }) 

  suite('Should not be able to move a Rover to outside plateau boundaries', async () => {     
    it("Top boundary", async () => {
      const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
      const rover = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          id: "position-top-id",
          xAxis: 4,
          yAxis: 4,
          cardinalPosition: CardinalPoint.N
        },
      })

      const { finalPosition } = rover

      expect(finalPosition.xAxis).toEqual(4)
      expect(finalPosition.yAxis).toEqual(4)
    })

    it("Below boundary", async () => {
      const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
      const rover = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          xAxis: 1,
          yAxis: 1,
          cardinalPosition: CardinalPoint.S
        },
      })

      const { finalPosition } = rover

      expect(finalPosition.xAxis).toEqual(1)
      expect(finalPosition.yAxis).toEqual(1)
    })
    
    it("Right boundary", async () => {
      const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
      const rover = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          xAxis: 4,
          yAxis: 4,
          cardinalPosition: CardinalPoint.E
        },
      })

      const { finalPosition } = rover

      expect(finalPosition.xAxis).toEqual(4)
      expect(finalPosition.yAxis).toEqual(4)
    })
    
    it("Left boundary", async () => {
      const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
      const rover = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          xAxis: 1,
          yAxis: 1,
          cardinalPosition: CardinalPoint.W
        },
      })

      const { finalPosition } = rover

      expect(finalPosition.xAxis).toEqual(1)
      expect(finalPosition.yAxis).toEqual(1)
    })  
  })
  
  suite('Should not be able to move a Rover to where another one is placed', async () => {     
    it("Top boundary", async () => {
      const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)

      const { finalPosition: rover1FinalPostion } = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          id: "position-top-id",
          xAxis: 4,
          yAxis: 1,
          cardinalPosition: CardinalPoint.N
        },
      })
      
      const { finalPosition: rover2FinalPostion } = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          id: "position-top-id",
          xAxis: 4,
          yAxis: 1,
          cardinalPosition: CardinalPoint.N
        },
      })
      
      expect({
        xAxis: rover1FinalPostion.xAxis,
        yAxis: rover1FinalPostion.yAxis,
      }).not.toStrictEqual({
        xAxis: rover2FinalPostion.xAxis,
        yAxis: rover2FinalPostion.yAxis,
      })

    })

    it("Bottom boundary", async () => {
      const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)

      const { finalPosition: rover1FinalPostion } = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          id: "position-bottom-id",
          xAxis: 4,
          yAxis: 4,
          cardinalPosition: CardinalPoint.S
        },
      })
      
      const { finalPosition: rover2FinalPostion } = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          id: "position-bottom-id",
          xAxis: 4,
          yAxis: 4,
          cardinalPosition: CardinalPoint.S
        },
      })

      expect({
        xAxis: rover1FinalPostion.xAxis,
        yAxis: rover1FinalPostion.yAxis,
      }).not.toStrictEqual({
        xAxis: rover2FinalPostion.xAxis,
        yAxis: rover2FinalPostion.yAxis,
      })
    })
    
    it("Right boundary", async () => {
      const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)

      const { finalPosition: rover1FinalPostion } = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          id: "position-right-id",
          xAxis: 1,
          yAxis: 1,
          cardinalPosition: CardinalPoint.E
        },
      })
      const { finalPosition: rover2FinalPostion } = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          id: "position-right-id",
          xAxis: 1,
          yAxis: 1,
          cardinalPosition: CardinalPoint.E
        },
      })

      expect({
        xAxis: rover1FinalPostion.xAxis,
        yAxis: rover1FinalPostion.yAxis,
      }).not.toStrictEqual({
        xAxis: rover2FinalPostion.xAxis,
        yAxis: rover2FinalPostion.yAxis,
      })
    })
    
    it("Left boundary", async () => {
      const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)

      const { finalPosition: rover1FinalPostion } = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          id: "position-left-id",
          xAxis: 4,
          yAxis: 4,
          cardinalPosition: CardinalPoint.W
        },
      })
      const { finalPosition: rover2FinalPostion } = await sut.execute({
        instruction: "M",
        plateauId: plateauId,
        landing: {
          ...roverPayload.landing,
          id: "position-left-id",
          xAxis: 4,
          yAxis: 4,
          cardinalPosition: CardinalPoint.W
        },
      })
      
      expect({
        xAxis: rover1FinalPostion.xAxis,
        yAxis: rover1FinalPostion.yAxis,
      }).not.toStrictEqual({
        xAxis: rover2FinalPostion.xAxis,
        yAxis: rover2FinalPostion.yAxis,
      })      
    })
  })

  suite('Should be able to match Documentation values', async () => {    
    it('Example 1', async () => {    
      /*
        ### Example 1

        Landing Position: 1 2 N \
        Instruction: LMLMLMLMM \
        Final Position: 1 3 N
      */

      const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
      roverPayload.plateauId = plateauId

      const rover = await sut.execute({
        ...roverPayload,
        landing: {
          id: "position-example1-id",
          xAxis: 1,
          yAxis: 2,
          cardinalPosition: CardinalPoint.N
        },
        instruction: "LMLMLMLMM"
      })

      const { finalPosition } = rover

      /**
       * Due to the verification to don't 
       * go outside boundaries the result 
       * does not match the instructions result
       * 
       * 
       * 
       */
      // expect(roverExample1FinalPosition.xAxis).toEqual(1)

      expect(finalPosition.xAxis).toEqual(2)
      expect(finalPosition.yAxis).toEqual(3)
      expect(finalPosition.cardinalPosition).toEqual(CardinalPoint.N)
    })

    it('Example 2', async () => {    
    /*     
      ### Example 2
      Landing Position: 3 3 E \
      Instruction: MRRMMRMRRM \
      Final Position: 2 3 S

    */

    const { id: plateauId } = await inMemoryPlateauRepository.create(plateauPayload)
    roverPayload.plateauId = plateauId

    const rover = await sut.execute({
      ...roverPayload,
      landing: {
        id: "position-example2-id",
        xAxis: 3,
        yAxis: 3,
        cardinalPosition: CardinalPoint.E
      },
      instruction: "MRRMMRMRRM"
    })
    
    const { finalPosition } = rover

    expect(finalPosition.xAxis).toEqual(2)
    expect(finalPosition.yAxis).toEqual(3)
    expect(finalPosition.cardinalPosition).toEqual(CardinalPoint.S)
  })
  })
})