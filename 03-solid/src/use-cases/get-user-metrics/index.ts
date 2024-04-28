import { CheckInstRepository } from '@/repositories/check-ins-repository-interface'

interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
    constructor(private checkInsRepository: CheckInstRepository) {}

    async execute({
        userId,
    }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkInsCount =
            await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount,
        }
    }
}
