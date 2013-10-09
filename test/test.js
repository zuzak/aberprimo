var api = require('../index')
var should = require('should')

describe('The API receiver', function () {
  it('should work with valid ISBNs', function (done) {
    api.get("0198204531", function (data) {
      data = data[0]
      data.creator.should.equal("Ina Zweiniger-Bargielowska")
      data.creationdate.should.equal("2000")
      done()
    })
  })

  it('should not work with invalid ISBNs', function (done) {
    api.get("1234", function (data) {
      should.not.exist(data)
      done()
    })
  })

  it('should work with ISBNs with no results', function (done) {
    api.get("0000000000000", function (data) {
      should.not.exist(data)
      done()
    })
  })
})

describe('The code name translator', function () {
  it('should translate correctly', function (done) {
    api.translate("ABERUSOA").should.equal("School of Art")
    done()
  })
})
