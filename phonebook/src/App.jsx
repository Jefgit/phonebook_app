import { useState, useEffect } from "react"
import {Filter} from "./components/Filter"
import {PersonForm} from "./components/PersonForm"
import {Persons} from "./components/Persons"
import personsService from "./services/persons"
import { Notification } from "./components/Notification"

function App() {

  const [newContact, setNewContact] = useState({name:"", number:"",id:""});
  const [persons, setPersons] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    personsService
    .getAll()
    .then(initialPerson => setPersons(initialPerson))
  }, [])


  const addContact = (e) => {
    e.preventDefault()
    const contactObject = {
      ...newContact,
      id: persons.length + 1
    }

    const isMatch = persons.find(person => person.name == contactObject.name)
    console.log(isMatch)
    if(isMatch){
      if(window.confirm(`${contactObject.name} is already added to phonebook, replace the old number with a new one ?`)){
        const changeContact = {...isMatch, number: newContact.number}
        personsService
        .update(isMatch.id, changeContact)
        .then(changeContact => {
          setPersons(persons.map(person => person.id == isMatch.id ? changeContact : person ))
          setMessage(`Contact ${isMatch.name} has been updated`)
          setIsError(false)
          setTimeout(() => {
            setMessage(null)
          },5000)
        })
        .catch((e) => {
          setMessage(`Information of ${isMatch.name} has already been removed from server`)
          setIsError(true)
          setTimeout(() => {
            setMessage(null)
          },5000)
        })
      }
    } else {
        personsService
        .create(contactObject)
        .then(newContact => {
          setPersons([...persons, contactObject])
          setMessage(`Added ${contactObject.name}`)
          setTimeout(() => {
            setMessage(null)
          },5000)
        })
      // setPersons([...persons, {name:newContact.name, number: newContact.number} ])
      setNewContact({name:"", number:""})
    }
    
  }

  const deleteHandler = (id) => {
    const match = persons.find((person) => person.id == id)

    if(window.confirm(`Delete ${match.name} ?`)){
      personsService
      .remove(id)
      .then(returnedPersons => {
        setPersons(persons.filter((person) => person.id !== id))
        setMessage(`${match.name} has been deleted!`)
        setIsError(false)
        setTimeout(() => {
          setMessage(null)
        },5000)
        
        
      })
    }
    
  } 

  const searchContact = (e) => {
    setSearchKey(e.target.value)
    const result = persons.filter(person => person.name.toLowerCase().includes(searchKey.toLocaleLowerCase()))
    setSearchResult(result)
    console.log(result)
  }

  return (
    <div>
      <Notification message = {message} isError={isError} />
      <h1>Phonebook</h1>
      <Filter searchKey={searchKey} handler={searchContact} />
      <h2>add a new</h2>
      <PersonForm  handler={addContact} newContact={newContact} setNewContact={setNewContact} />
      <h2>Numbers</h2>
      <Persons persons = {persons} textSearch = {searchKey} searchResult = {searchResult} handler = {deleteHandler}/>
    </div>
  )
}

export default App
