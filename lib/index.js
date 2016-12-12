const isPlainObject = require('is-plain-object')
const isEmptyObject = require('is-empty-object')
const traverse = require('traverse')
const symbolDescription = require('symbol-description')

const returnFalseEarly = () => {
  throw new Error()
}

const isRegalia = (subject) => {
  let result = true
  if (!isPlainObject(subject)) return false

  try {
    traverse(subject).reduce(function (symbols, node) {
      if (!isEmptyObject(node) && this.isLeaf) {
        if (typeof node !== 'symbol') {
          returnFalseEarly()
        }
        if (symbolDescription(node) !== this.path.join('.')) {
          returnFalseEarly()
        }
        if (symbols.includes(node)) {
          returnFalseEarly()
        }
        if (Symbol.keyFor(node) !== undefined) {
          returnFalseEarly()
        }
      } else {
        if (!isPlainObject(node)) {
          returnFalseEarly()
        }
      }

      return symbols
    }, [])
  } catch (e) {
    result = false
  }

  return result
}

module.exports = isRegalia
