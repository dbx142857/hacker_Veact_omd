@Import(s)
class {
    child = require('./garbage-require-test1-child')
}
module.exports = {
    foo: 'bar-test111111',
    s: s.child
}