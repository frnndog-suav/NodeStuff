import { UseCaseError } from '@/core/error/use-case-error-interface'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found!')
  }
}
