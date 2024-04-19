import Papa from 'papaparse'

export async function parseCSV(csvUrl) {
  const result = await new Promise((resolve, reject) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data)
      },
      error: (error) => {
        reject(error)
      }
    })
  })
  console.log('Données parsées:', result)
  return result.map((item, index) => ({
    id: index,
    expressionEn: item['ExpressionAnglaise'],
    expressionFr: item['ExpressionFrançaise'],
    imagePath: item['Image'],
    origine: item['Origine'],
    type: item['Type']
  }))
}
