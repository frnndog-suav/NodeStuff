import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { content, title } = body
    const { sub: userId } = user

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug: this.stringToSlug(title),
      },
    })
  }

  private stringToSlug(title: string): string {
    return title
      .normalize('NFD') // Decompose accented characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove non-alphanumeric characters (except spaces and hyphens)
      .trim() // Trim leading/trailing whitespace
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .toLowerCase() // Convert to lowercase
  }
}
