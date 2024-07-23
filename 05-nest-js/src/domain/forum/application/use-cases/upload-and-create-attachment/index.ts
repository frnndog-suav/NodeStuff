import { Either, left, right } from '@/core/error/either'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { AttachmentsRepository } from '../../repositories/attachments'
import { Uploader } from '../../storage/uploader'
import { InvalidAttachmentType } from '../_errors/invalid-file-type-error'

const FILE_REGEX = /^image\/(jpeg|png)$|^application\/pdf$/

export type TUploadAndCreateAttachmentUseCaseRequest = {
  fileName: string
  fileType: string
  body: Buffer
}

export type TUploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentType,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    body,
    fileName,
    fileType,
  }: TUploadAndCreateAttachmentUseCaseRequest): Promise<TUploadAndCreateAttachmentUseCaseResponse> {
    if (!FILE_REGEX.test(fileType)) {
      return left(new InvalidAttachmentType(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentsRepository.create(attachment)

    return right({ attachment })
  }
}
