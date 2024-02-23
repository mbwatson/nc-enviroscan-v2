const fs = require('fs')
const path = require('path')
const { faker } = require('@faker-js/faker')
const arg = require('arg')
const { v4: uuidv4 } = require('uuid')
const { cities: nc } = require('./cities/nc.json')
const { cities: wa } = require('./cities/wa.json')
const { chemicals } = require('./pfas-chemicals.json')

const testContentPath = path.join('./src', 'content')
const testContentFile = path.join(testContentPath, 'test-data-v2.json')
const cities = { ...nc, ...wa }

// defaults
let SAMPLE_COUNT = 1
let STUDY_COUNT = 2
let VERBOSE_MODE = false
let WRITE_MODE = true

// parse command line arguments
const args = arg({
  // types
  '--verbose': Boolean,
  '--pretend': Boolean,
  '--number': Number,
  '--datasets': Number,
  // aliases
  '-v': '--verbose',
  '-p': '--pretend',
  '-n': '--number',
  '-d': '--datasets',
})

// overwrite defaults as needed
if (args['--number'] > 0) {
	SAMPLE_COUNT = args['--number']
}
if (args['--datasets'] > 0) {
	STUDY_COUNT = args['--datasets']
}
if (args['--verbose']) {
  VERBOSE_MODE = true
}
if (args['--pretend']) {
  WRITE_MODE = false
}

//

// shared values
const cityNames = Object.keys(cities)
const datasets = faker.helpers.multiple(
	() => faker.word.noun({ min: 4, max: 8 }),
	{ count: STUDY_COUNT },
).map(w => w.toUpperCase())

function generateRecord() {
	// construct all the pieces
	const dataset = faker.helpers.arrayElement(datasets)
	const medium = faker.helpers.arrayElement(['Water', 'Dust', 'Serum'])
	const sampleCount = faker.number.int({ min: 1, max: 100 })
	const targetOrNta = faker.helpers.arrayElement(['Target', 'NTA'])
	const city = faker.helpers.arrayElement(cityNames)
	const state = cities[city].state
	const zipCode = cities[city].zipCode
	const [lat, long] = faker.location.nearbyGPSCoordinate({
		origin: [cities[city].lat, cities[city].long],
		radius: 3,
	})
	const now = new Date().toISOString()
	const sampleDate = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: now })
	const analysisDate = faker.date.between({ from: sampleDate, to: now })
	const chemical = faker.helpers.arrayElement(chemicals)
	const chemicalName = chemical.name
	const chemicalFormula = chemical.formula
	const molecularMass = chemical.mass
	const dtxsID = chemical.dtxsId
	const retentionTime = faker.number.float({ min: 1, max: 10 }).toFixed(2)
	const idConfidenceLevel = faker.helpers.arrayElement([
		'1',
		'2a',
		'2b',
		'3',
		'4',
	])
	const abundance = faker.number.float({ min: 5, max: 1500000 }).toFixed(2)
	const units = faker.helpers.arrayElement([
		'ng/ml',
		'ng/g',
		'ng/L',
		'Instrument Abundance',
	])
	const mrlOrDl = faker.number.float({ min: 0.1 , max: 10000, fractionDigits: 1 }).toFixed(2)

	// assemble
	const study = {
		dataset,
		medium,
		sampleCount,
		targetOrNta,
	}
	const location = {
		city,
		state,
		zipCode,
		lat,
		long,
	}
	const temporal = {
		sampleDate,
		analysisDate,
	}
	const chemicalIdentity = {
	  chemicalName,
	  dtxsID,
	  chemicalFormula,
	}
	const nontargetedRelevantChemicalId = {
		molecularMass,
		retentionTime,
		idConfidenceLevel,
	}
	const quantitation = {
		abundance,
		units,
		mrlOrDl,
	}

  return {
  	id: uuidv4(),
  	study: study,
  	location: location,
  	temporal: temporal,
  	chemicalId: chemicalIdentity,
  	nontargetedChemicalId: nontargetedRelevantChemicalId,
  	quantitation: quantitation,
  }
}

// generate data
const data = faker.helpers.multiple(generateRecord, { count: SAMPLE_COUNT })

// conditionally log generated data
VERBOSE_MODE &&
  console.log(
    'VERBOSE_MODE=true\n',
    JSON.stringify(data, null, 2)
  )

// log generated data summary
console.log(`| successfully wrote ${ SAMPLE_COUNT } records to ${ testContentPath }.`)

// conditionally write generated data
if (WRITE_MODE) {
  // ensure the content location exists before proceeding.
  if (!fs.existsSync(testContentPath)) {
    fs.mkdirSync(testContentPath, { recursive: true })
  }
  // write new data
  fs.writeFileSync(testContentFile, JSON.stringify(data, null, 2))
} else {
  console.log('WRITE_MODE=false: no test data was written.')
}
