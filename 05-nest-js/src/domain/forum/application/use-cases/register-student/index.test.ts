import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { RegisterStudentUseCase } from '.'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let useCase: RegisterStudentUseCase

describe('[Use Case] - Register student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    useCase = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  it('should be able to register a new student', async () => {
    const result = await useCase.execute({
      email: 'super.homem@gmail.com',
      name: 'Super Homem',
      password: '123',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await useCase.execute({
      email: 'super.homem@gmail.com',
      name: 'Super Homem',
      password: '123',
    })

    const hashedPassword = await fakeHasher.hash('123')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  })
})
