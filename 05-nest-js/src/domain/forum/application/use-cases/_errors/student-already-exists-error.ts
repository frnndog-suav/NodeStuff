import { UseCaseError } from '@/core/error/use-case-error-interface'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student with same ${identifier} already exists!`)
  }
}
