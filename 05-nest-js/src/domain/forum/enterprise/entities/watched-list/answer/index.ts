import { WatchedList } from '@/core/pattern/watched-list'
import { AnswerAttachment } from '../../attachment/answer-attachment'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
