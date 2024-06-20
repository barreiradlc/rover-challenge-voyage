import { InMemoryPlateauRepository } from '@/core/repositories/in-memory/in-memory-plateau-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePlateauDTO } from '../dtos/plateau/create-plateau-dto'
import { CreatePlateauUseCase } from './createPlateauUseCase'

let inMemoRyPlateauRepository: InMemoryPlateauRepository
let sut: CreatePlateauUseCase

const plateauPayload: CreatePlateauDTO = {
  width: 4,
  height: 4
}

describe("Create Plateau useCase", () => {
  beforeEach(() => {
    inMemoRyPlateauRepository = new InMemoryPlateauRepository()
    sut = new CreatePlateauUseCase(inMemoRyPlateauRepository)
  })

  it('Should be able to create Plateau', async () => {
    const plateau = await sut.execute(plateauPayload)

    expect(plateau.id).toEqual(expect.any(String))
  })
})