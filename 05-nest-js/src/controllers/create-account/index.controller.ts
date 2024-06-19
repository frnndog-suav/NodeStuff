import { Controller, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma = PrismaService) {}

  @Post()
  async handle() {
    const name = 'Pedro silva'
    const email = 'pedro.pedro.silva@gmail.com'
    const password = '123'

    await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })
  }
}
