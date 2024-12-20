import { CheckInstRepository } from '@/repositories/check-ins-repository-interface'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryRequest {
    userId: string
    page: number
}

interface FetchUserCheckInsHistoryResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private checkInsRepository: CheckInstRepository) {}

    async execute({
        userId,
        page,
    }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return {
            checkIns,
        }
    }
}
