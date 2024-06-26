import { WatchedList } from '@/core/pattern/watched-list'
import { QuestionAttachment } from '../../attachment/question-attachment'

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
