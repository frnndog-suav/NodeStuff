import { Attachment } from '@prisma/client'

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}
