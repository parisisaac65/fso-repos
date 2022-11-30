import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const doesNameAlreadyExist = persons.find(person => person.name === newName) 
    if (doesNameAlreadyExist) {
      alert(`${newName} is already added to phonebook`) 
    }
    else{
      const nameObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value) 
    const regex = new RegExp (event.target.value, 'gi')
    const findPersons = persons.filter(person => person.name.match(regex))
    setPersons(findPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='filter shown with' value={newFilter} handleChange={handleFilterChange}/> 
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={addPerson} 
        text1='name' name={newName} handleNameChange={handleNameChange}
        text2='number' number={newNumber} handleNumberChange={handleNumberChange} 
      /> 
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
    
  )
}


export default App

