[![Build Status](https://travis-ci.org/mightyiam/is-regalia.svg?branch=master)](https://travis-ci.org/mightyiam/is-regalia) [![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# is-regalia

Validates [regalia](https://www.npmjs.com/package/regalia)

## Why?

To make it easy writing regalia tests.

## How?

By traversing the provided tree and returning early on negatives.

## Usage

### Example

```js
const regalia = require('regalia')
const isRegalia = require('is-regalia')

const constants = regalia({
  a: ['one, two'],
  b: ['one, two']
})

isRegalia(constants) // true

isRegalia({ a: Symbol('b') }) // false
isRegalia({ a: { one: Symbol('a.two') } }) // false
isRegalia({ a: Symbol.for('a') }) // false
isRegalia('foo') // false
isRegalia(Symbol()) // false
```

### API

#### `isRegalia(subject)`

- `subject`:
  the value you wish to validate

Synchronously returns result boolean.
