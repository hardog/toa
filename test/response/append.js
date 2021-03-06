'use strict'

var tman = require('tman')
var assert = require('assert')
var context = require('../context')

tman.suite('ctx.append(name, val)', function () {
  tman.it('should append multiple headers', function () {
    var ctx = context()

    ctx.append('x-foo', 'bar1')
    ctx.append('x-foo', 'bar2')
    assert.deepEqual(ctx.response.header['x-foo'], ['bar1', 'bar2'])
  })

  tman.it('should accept array of values', function () {
    var ctx = context()

    ctx.append('Set-Cookie', ['foo=bar', 'fizz=buzz'])
    assert.deepEqual(ctx.response.header['set-cookie'], ['foo=bar', 'fizz=buzz'])

    ctx.append('Set-Cookie', ['name=zhang', 'age=30'])
    assert.deepEqual(ctx.response.header['set-cookie'], ['foo=bar', 'fizz=buzz', 'name=zhang', 'age=30'])
  })

  tman.it('should get reset by res.set(field, val)', function () {
    var ctx = context()

    ctx.append('Link', '<http://localhost/>')
    ctx.append('Link', '<http://localhost:80/>')
    ctx.set('Link', '<http://127.0.0.1/>')
    assert.strictEqual(ctx.response.header.link, '<http://127.0.0.1/>')
  })

  tman.it('should work with res.set(field, val) first', function () {
    var ctx = context()

    ctx.set('Link', '<http://localhost/>')
    ctx.append('Link', '<http://localhost:80/>')
    assert.deepEqual(ctx.response.header.link, ['<http://localhost/>', '<http://localhost:80/>'])
  })
})
