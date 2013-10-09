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

function translate (place) {
  switch (place) {
    case "ABERUCLP":
      return "Centre for Legal Practice"
    case "ABERUCPR":
      return "Centre for Performance Research"
    case "ABERUEXS":
      return "External Store"
    case "ABERUHOL":
      return "Hugh Owen Library"
    case "ABERULAW":
      return "Hugh Owen Library: Law Library"
    case "ABERUOCL":
      return "Old College Library"
    case "ABERUPSL":
      return "Physical Sciences Library"
    case "ABERUSGO":
      return "Stapledon Gogerddan"
    case "ABERUSOA":
      return "School of Art"
    case "ABERUTPL":
      return "Thomas Parry Library"
    case "ABERUWWW":
      return "Electronic"
    default:
      return null
  }
}

module.exports = {
  get: lookup,
  translate: translate
}
