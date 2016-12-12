const { test } = require('ava')

const subject = require('.')

const symbolA = Symbol('a')

test('exports function of arity 1', (t) => {
  t.is(typeof subject, 'function')
  t.is(subject.length, 1)
})

const expectedIOs = [
  {
    i: 1,
    o: false,
    name: 'number'
  },
  {
    i: 'foo',
    o: false,
    name: 'string'
  },
  {
    i: () => {},
    o: false,
    name: 'function'
  },
  {
    i: [],
    o: false,
    name: 'array'
  },
  {
    i: [ Symbol() ],
    o: false,
    name: 'array of symbol'
  },
  {
    i: {},
    o: true,
    name: 'empty object'
  },
  {
    i: { foo: Symbol() },
    o: false,
    name: 'symbol without description'
  },
  {
    i: { foo: Symbol.for() },
    o: false,
    name: '`Symbol.for` without description'
  },
  {
    i: { foo: Symbol.for('foo') },
    o: false,
    name: '`Symbol.for` with correct description'
  },
  {
    i: { foo: Symbol('bar') },
    o: false,
    name: 'wrong description at depth 0'
  },
  {
    i: { a: { one: Symbol('a.two') } },
    o: false,
    name: 'wrong description at depth 1'
  },
  {
    i: { a: 'foo' },
    o: false,
    name: 'value at depth 1 is string'
  },
  {
    i: { a: 'a' },
    o: false,
    name: 'value at depth 1 is path string'
  },
  {
    i: { a: 2 },
    o: false,
    name: 'value at depth 1 is number'
  },
  {
    i: { a: {} },
    o: true,
    name: 'empty object at depth 1'
  },
  {
    i: { a: [] },
    o: false,
    name: 'value at depth 1 is array'
  },
  {
    i: { a: () => {} },
    o: false,
    name: 'value at depth 1 is function'
  },
  {
    i: { a: Symbol('a') },
    o: true,
    name: '1 symbol'
  },
  {
    i: { a: Symbol('a'), b: Symbol('b') },
    o: true,
    name: '2 symbols'
  },
  {
    i: { a: { one: Symbol('a.one') } },
    o: true,
    name: 'depth 1'
  },
  {
    i: { a: { one: { I: Symbol('a.one.I') } } },
    o: true,
    name: 'depth 1'
  },
  {
    i: { a: symbolA, b: symbolA },
    o: false,
    name: 'duplicate symbol'
  }
]

expectedIOs.forEach(({ i, o, name }) => {
  test(name, (t) => {
    t.is(subject(i), o)
  })
})
