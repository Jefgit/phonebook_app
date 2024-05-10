const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('contact', (req) => {
    return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())


app.get('/info', (request, response) => {
    const timeStamp = new Date().toString();

    response.send(`<p>Phonebook has info for ${contacts.length} people<p>
        <p>${timeStamp}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if(contact){
        response.json(contact)
    } else {
        response.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

const createId = () => {
    return Math.floor(Math.random()*10000)
} 

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contact' ))
app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'The name or number is missing'
        })
    }

    const nameExist = contacts.find(contact => contact.name === body.name)

    if(nameExist){
        return response.status(400).json({
            error: 'The name already exists in the phonebook'
        })
    }

    const contact = {
        id: createId(),
        name:body.name,
        number:body.number
    }

    contacts = contacts.concat(contact)
    response.json(contact)   
    
})


const PORT = process.env.PORT || 3001;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})