import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body

    const userWithTheSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithTheSameEmail) {
      throw new ConflictException('User with the same e-mail address exists.')
    }

    await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })
  }
}
