import { expect, test } from 'vitest'
import { Slug } from '.'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example question title')

  expect(slug.value).toStrictEqual('example-question-title')
})
