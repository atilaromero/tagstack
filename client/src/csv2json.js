const Papa = require('papaparse')

const convert = (csv) => {
  const result = Papa.parse(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  })
  return result
}

if (typeof require != 'undefined' && require.main===module) {
  const fs = require('fs')
  const csv = fs.readFileSync(process.argv[2], 'utf8')
  console.log(JSON.stringify(convert(csv),null,2))
}