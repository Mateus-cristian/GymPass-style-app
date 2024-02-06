import { describe, it, expect, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryusersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryusersRepository
let sut: GetUserProfileUseCase

describe('Get user profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryusersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user p', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile wrong id', async () => {
    await expect(
      sut.execute({
        userId: 'not-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
