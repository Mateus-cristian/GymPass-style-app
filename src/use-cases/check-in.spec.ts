import { describe, it, expect, beforeEach } from 'vitest'
import { CheckInUseCase } from './checkIn'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.user_id).toEqual(expect.any(String))
  })
})
