import { Student } from '@/domain/forum/enterprise/entities/student'

export abstract class StudentsRepository {
  abstract create(student: Student): Promise<void>
  abstract findByEmail(id: string): Promise<Student | null>
}
