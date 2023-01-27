import { useState } from 'react'
import { useEffect} from 'react'
import noteService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredpersons, setFiltered] = useState(persons.concat()) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      setPersons(response.data)
      setFiltered(response.data)
    })
  }, [])

  const addName = (adding) => {
    adding.preventDefault()
    const nameholder = newName
    if (persons.some(person =>
      person.name === nameholder)) {
        window.alert(`${nameholder} is already added to phonebook`)
    } else {
      const personObject = {
        name: nameholder,
        number: newNumber
      }
      noteService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          if (!personObject.name.includes(newFilter) || newFilter === ''){
            setFiltered(filteredpersons.concat(personObject))
          }
          setNewName('')
          setNumber('')
        })
    }
  }

  const nameHandler = (input) => {
    setNewName(input.target.value)
  }
  const numberHandler = (input) => {
    setNumber(input.target.value)
  }

  /* Calling checkFunction for each object in the space 'persons'.
  The function returns a reduced copy with only elements that do
  not contain a person with a name containing the string given by 
  'input'. That copy is then put to the space 'filteredpersons'. */
  const filterHandler = (input) => {
    const filterCheck = () => {
      if (input === 0) {
        return newFilter
      } else {
        return input.target.value
      }
    }
    const filter = filterCheck()
    setFilter(filter)
    const initarray = []
    if (filter !== '') {
      const filtered = persons.reduce(
        (accumulator, currentPerson) => (
          checkFunction(accumulator, currentPerson, filter)
        ),
        initarray
        )
      setFiltered(filtered)
    } else {
      setFiltered(persons.concat())
    }
  } 

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      noteService
        .remove(person.id) 
        .then(response => {
          setPersons(persons.filter(p => p.name !== person.name).concat())
          setFiltered(filteredpersons.filter(p => p.name !== person.name).concat())
        })
    }
  }

  const createFilterObject = () => {
    const filterObject = {
      filteredpersons : filteredpersons,
      deletePerson : deletePerson
    }
    return (
      filterObject
    )
  }

  const createFormObject = () => {
    const formObject = {
      newName : newName,
      newNumber : newNumber,
      nameHandler : nameHandler,
      numberHandler : numberHandler,
      addName : addName
    }
    return (
      formObject
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} filterHandler={filterHandler}/>
      <h2>add a new</h2>
      <PersonForm {...createFormObject()}/>
      <h2>Numbers</h2>
      <Persons {...createFilterObject()}/>
    </div>
  )

}

const PersonForm = ({newName, newNumber, nameHandler, numberHandler, addName}) => {

  return (
    <form onSubmit={addName}>
      <div>
        name: <input
          value={newName}
          onChange={nameHandler}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={numberHandler}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({filteredpersons, deletePerson}) => {
  const handleClick = (person) => {
    deletePerson(person)
  }

  return (
      <ul>
        {filteredpersons.map(person => 
          <li key={person.name}>
            {person.name} {person.number} &nbsp;
            <button onClick={() => handleClick(person)}>delete</button>
          </li>
        )}
      </ul>
  )
}

const Filter = ({newFilter, filterHandler}) => (
  <div>
    filter shown with <input
      value={newFilter}
      onChange={filterHandler}
    />
  </div>
)

 
/* Checks if the string in 'filter' is contained in the name of
the object 'currentPerson'. If not, that person is added to accumlated
array copy in 'accumulator', which starts as an empty array
and is in the end returned. */
  const checkFunction = (accumulator, currentPerson, filter) => {
    if (currentPerson.name.toLowerCase().includes(filter)) {
      return accumulator
    } else {
      return (
        accumulator.concat(currentPerson)
      )
    }
  }



export default App