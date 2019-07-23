const multiline = function (fn) {
  const string = fn.toString()
  const name = fn.name
  const length = fn.length
  console.log(string, name, length)

  const arr = string.split('\n')
  console.log(arr)
  const result = arr.slice(1, arr.length - 1).join('\n')
  console.log(result)
}

function f() {/*
  这是一个
  多行注释
*/}

multiline(f)

function a(a, b) {
  'use strict'
  console.log(arguments)
  arguments[0] = 3
  arguments[1] = 2
  return a + b
}

const result = a(1, 2)
console.log(result)