import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const bodySchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
  })

  const { latitude, longitude } = bodySchema.parse(request.body)
  const { gymId } = paramsSchema.parse(request.params)

  const checkInsUseCase = makeCheckInUseCase()

  await checkInsUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
