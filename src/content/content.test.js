const fs = require('fs')
const data = require('./test-data-v2.json')

test('data records have expected top-level properties', () => {
	const expectedKeys = [
		'id', 'study', 'location', 'temporal', 'chemicalId', 'nontargetedChemicalId', 'quantitation'
	].sort()
	expect(data.every(d => {
		const actualKeys = Object.keys(data[0]).sort()
		return JSON.stringify(actualKeys) === JSON.stringify(expectedKeys)
	}))
})
