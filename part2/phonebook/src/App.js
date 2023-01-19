import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []) 

  const deleteFromPhonebook = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)){
      personService
      .deletePerson(id)
      .then(newPersons => {
        setPersons(newPersons)
        setPersons(persons.map(person => person.id !== id? person : newPersons))
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName) 
    const changedPerson = { ...existingPerson, number: newNumber }

    if (existingPerson && window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)){
      personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setNewMessage(
          `Successfully updated ${existingPerson.name}'s contact number`
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNewMessage(
          `ERROR: ${changedPerson.name} was already removed from the server`
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== changedPerson.id))
      })
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNewMessage(`Added ${newName}`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
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
      <Notification message={newMessage} />
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
          <Person 
            key={person.id} 
            person={person}
            handleDelete={() => deleteFromPhonebook(person.id)}
          />
        )}
      </ul>
    </div>
    
  )
}


export default App

