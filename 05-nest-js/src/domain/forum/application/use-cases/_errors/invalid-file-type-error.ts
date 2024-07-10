import { UseCaseError } from '@/core/error/use-case-error-interface'

export class InvalidAttachmentType extends Error implements UseCaseError {
  constructor(type: string) {
    super(`File type ${type} is not valid!`)
  }
}
