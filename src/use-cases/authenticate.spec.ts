import { describe, it, expect } from 'vitest'
import { InMemoryusersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredencialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryusersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John doe',
      email: 'johnDoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johnDoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toBe(user.id)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryusersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect(() =>
      sut.execute({
        email: 'johnDoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryusersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John doe',
      email: 'johnDoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johnDoe@gmail.com',
        password: '1234987',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialsError)
  })
})
