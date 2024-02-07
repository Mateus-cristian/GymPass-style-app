import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearby {
  userLatitude: number
  userLongitude: number
}

export interface GymsRepository {
  findById: (gymId: string) => Promise<Gym | null>
  create: (data: Prisma.GymCreateInput) => Promise<Gym>
  searchMany: (query: string, page: number) => Promise<Gym[]>
  findManyNearby: ({
    userLatitude,
    userLongitude,
  }: FindManyNearby) => Promise<Gym[]>
}
