import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
  })

  const { title, description, phone, latitude, longitude } = bodySchema.parse(
    request.body,
  )

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
