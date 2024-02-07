import { CheckIn } from '@prisma/client'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private inMemoryCheckInRepository: InMemoryCheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.inMemoryCheckInRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
