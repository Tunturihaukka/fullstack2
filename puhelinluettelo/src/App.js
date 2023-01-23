import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')

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
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNumber('')
  }

  const nameHandler = (input) => {
    setNewName(input.target.value)
  }
  const numberHandler = (input) => {
    setNumber(input.target.value)
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
          number: <input
            value={newNumber}
            onChange={numberHandler}
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
            {person.name} {person.number}
          </li>
        )}
      </ul>
    </div>
  )

}

export default App