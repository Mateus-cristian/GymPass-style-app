import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript gym',
      description: null,
      phone: null,
      latitude: -27.2092852,
      longitude: -49.6481891,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
