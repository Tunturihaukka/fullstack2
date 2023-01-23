import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (adding) => {
    const nameholder = newName
    adding.preventDefault()
    const personObject = {
      name: nameholder
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const nameHandler = (input) => {
    setNewName(input.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={nameHandler}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <li key={person.name}>
            {person.name}
          </li>
        )}
      </ul>
    </div>
  )

}

export default App