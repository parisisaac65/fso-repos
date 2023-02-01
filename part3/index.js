require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/mongo')

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(morgan('tiny'))
app.use(express.static('build'))


app.get('/', (req, res) => {
	res.send('<h1>Phonebook Application</h1>')
})

//fetch all persons/resources
app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})


app.get('/info', (request, response) => {
	const date_time = new Date()
	Person.find({}).then(persons => {
		response.send(
			`<div>
                <p>Phonebook has info for ${persons.length} people</p>
                <p>${date_time}</p>
            </div>`)
	})
})

// fetching/getting a single resource
app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
	const body = request.body

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
		.catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))

})



// If the user tries to create a new phonebook entry for a person whose name is already
// in the phonebook, the frontend will try to update the phone number of the existing entry by making an
// HTTP PUT request to the entry's unique URL.
app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body

	Person.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.use(unknownEndpoint)
// this has to be the last loaded middleware.
app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

