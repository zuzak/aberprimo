var api = require('../index')
var should = require('should')

describe('The app...', function () {
  it('should work with valid ISBNs', function (done) {
    api("0198204531", function (data) {
      data = data[0]
      data.creator.should.equal("Ina Zweiniger-Bargielowska")
      data.creationdate.should.equal("2000")
      done()
    })
  })

  it('should not work with invalid ISBNs', function (done) {
    api("1234", function (data) {
      should.not.exist(data)
      done()
    })
  })

  it('should work with ISBNs with no results', function (done) {
    api("0000000000000", function (data) {
      should.not.exist(data)
      done()
    })
  })
})
