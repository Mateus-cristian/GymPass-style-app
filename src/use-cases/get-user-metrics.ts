import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'

interface GetUserMetricsRequest {
  userId: string
}

interface GetUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private inMemoryCheckInRepository: InMemoryCheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount =
      await this.inMemoryCheckInRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
