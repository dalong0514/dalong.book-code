import { sum } from '@/code/jestStudy'
import { statement } from '@/code/statement'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('object assignment', () => {
  const data = { one: 1 }
  data.two = 2
  expect(data).toEqual({
    one: 1,
    two: 2
  })
})

test('string test using Re', () => {
  expect('dalong').toMatch(/^da.*/)
})

test('the result match for statement', () => {
  expect(statement()).toBe('$1,730.00')
})