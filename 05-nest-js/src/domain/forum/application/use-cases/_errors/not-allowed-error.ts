import { UseCaseError } from '@/core/error/use-case-error-interface'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not allowed!')
  }
}
