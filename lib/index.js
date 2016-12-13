const isPlainObj = require('is-plain-obj')
const isEmptyObject = require('is-empty-object')
const traverse = require('traverse')
const symbolDescription = require('symbol-description')

const returnFalseEarly = () => {
  throw new Error()
}

const isRegalia = (subject) => {
  let result = true
  if (!isPlainObj(subject)) return false

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
        if (!isPlainObj(node)) {
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
