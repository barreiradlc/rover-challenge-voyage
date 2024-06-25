import { InMemoryPlateauRepository } from '@/core/repositories/in-memory/in-memory-plateau-repository'
import { FindPlateauUseCase } from '@/modules/plateau/useCases/findPlateauUseCase'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePlateauDTO } from '../dtos/plateau/create-plateau-dto'

let inMemoRyPlateauRepository: InMemoryPlateauRepository
let sut: FindPlateauUseCase

const plateauPayload: CreatePlateauDTO = {
  width: 4,
  height: 4
}

describe("Find Plateau useCase", () => {
  beforeEach(() => {
    inMemoRyPlateauRepository = new InMemoryPlateauRepository()
    sut = new FindPlateauUseCase(inMemoRyPlateauRepository)
  })

  it('Should be able to find Plateau by id', async () => {
    const { id } = await inMemoRyPlateauRepository.create(plateauPayload)

    const plateau = await sut.execute(id)

    expect(plateau.id).toEqual(expect.any(String))
  })

  it('Should not be able to find Plateau by invalid id', async () => {
    await inMemoRyPlateauRepository.create(plateauPayload)

    await expect(async () =>
      sut.execute('some-invalid-id')
    ).rejects.toBeInstanceOf(Error)        
  })
})