export async function parseCSV(csvData) {
  const Papa = require('papaparse')
  const result = await new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        resolve(results.data)
      }
    })
  })
  return result.map((item, index) => ({
    id: index,
    expressionEn: item['expressionEn'],
    expressionFr: item['expressionFr'],
    origine: item['origine'],
    imagePath: item['ImagePath'],
    type: item['type']
  }))
}
