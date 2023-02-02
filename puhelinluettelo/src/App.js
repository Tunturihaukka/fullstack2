import { useState } from 'react'
import { useEffect} from 'react'
import noteService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredpersons, setFiltered] = useState(persons.concat()) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [alertmessage, setAlert] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      setPersons(response.data)
      setFiltered(response.data)
    }).catch(error => {
      console.log('error')
    })
  }, [])


  /* Handles request of adding new name with a number to the phonebook */
  const addName = (adding) => {
    adding.preventDefault()
    const nameholder = newName

    /* Calls to check if the name to be added already exists (in space of app)  */
    const foundobj = personSearch(nameholder,persons)
    
    if (foundobj !== null) {
      if (window.confirm(`${foundobj.retname} is already in phonebook, change number?`)) {
        /* If the name already existed, and user requests the number to be changed */
        const personObject = {
          name: foundobj.retname,
          number: newNumber
        }
        noteService
          /* updates the object in the server. Replaces old object with new having new number */
          .update(foundobj.id, personObject)
          .then(response => {
            noteService
              /* updates person arrays in the space of App by retrieving updated objects from server */
              .getAll()
              .then(response => {
                setPersons(response.data)
                /* If the filter field has content, checks if the just updated object's name 
                contains the string to be filtered */
                if (newFilter !== '') { 
                  /* Filtering the object list retrieved from the server */
                  const filtered = response.data.reduce(
                    (accumulator, currentPerson) => (
                      checkFunction(accumulator, currentPerson, newFilter)
                    ),
                    []
                    )
                  setFiltered(filtered)
                } else {
                  /* Without filter, all objects are added to persons and
                  to filteredpersons spaces. (The site shows filteredpersons.) */
                  setFiltered(response.data)
                }
              })
          })
          /* Name and number fields for adding new person can now be emptied
          by emptying related spaces in App before refresh */
          setNewName('')
          setNumber('')
          setAlert(`Number of ${nameholder} was updated`)
          setTimeout(() => {
            setAlert(null)
          }, 5000)
      }
    } else {
      /* If the name of the person to be added was not found in phonebook already */
      const personObject = {
        name: nameholder,
        number: newNumber
      }
      noteService
        /* Adds a new person object to server. */
        .create(personObject)
        .then(response => {
          /* Here new person is added to the site by directly editing the relevant 
          spaces in App.  */
          setPersons(persons.concat(personObject))
          if (!personObject.name.includes(newFilter) || newFilter === ''){
            setFiltered(filteredpersons.concat(personObject))
          }
          setNewName('')
          setNumber('')
        })
        setAlert(`Added ${nameholder}`)
        setTimeout(() => {
          setAlert(null)
        }, 5000)
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
        setAlert(`Deleted ${person.name} successfully`)
        setTimeout(() => {
          setAlert(null)
        }, 5000)
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
      <Notification message={alertmessage} />
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} filterHandler={filterHandler}/>
      <h2>add a new</h2>
      <PersonForm {...createFormObject()}/>
      <h2>Numbers</h2>
      <Persons {...createFilterObject()}/>
    </div>
  )

}

const personSearch = (searchname, persons) => {
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].name === searchname){
      console.log(i, persons[i].name)
      const returnobj = {
        id : persons[i].id,
        retname : persons[i].name,
        number : persons[i].number
      }
      return returnobj
    }
  }
  return null
}

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }
  if (success) {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
  return (
    <div className="alert">
      {message}
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