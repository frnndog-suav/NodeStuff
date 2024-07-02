import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Get question by slug [e2e]', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions/:slug', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: '123',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.create({
      data: {
        title: 'question 1',
        slug: 'question-1',
        content: 'question content',
        authorId: user.id,
      },
    })

    const response = await request(app.getHttpServer())
      .get(`/questions/question-1`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toStrictEqual(200)

    expect(response.body).toEqual({
      questions: expect.objectContaining({ title: 'question 1' }),
    })
  })
})
