import { AppModule } from '@/infra/app.module'
import { DataBaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'

describe('Authenticate [e2e]', () => {
  let app: INestApplication
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DataBaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await studentFactory.makePrismaStudent({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: await hash('123', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'john.doe@gmail.com',
      password: '123',
    })

    expect(response.statusCode).toStrictEqual(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
