var isbnjs = require('isbn').ISBN
var request = require('request')

const ENDPOINT = "https://voyager.aber.ac.uk/foruli/index.cgi?isbn="

var lookup = function ( isbn, callback )
{
  var isbn10 = isbnjs.asIsbn10(isbn)
  if (isbn10) {
    getData(isbn10, function (data) {
      if (!data) {
        getData(isbnjs.asIsbn13(isbn), function (data) {
          callback(data)
        })
      } else {
        callback(data)
      }
    })
  } else {
    callback(null)
  }
}

function getData (isbn, callback) {
  request({
      url: ENDPOINT + isbn,
      json: true,
    }, function ( error, response, data ) {
      if (error || data.error) { callback(null) }
      callback(data)
    }
  )
}

module.exports = lookup
