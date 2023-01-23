const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
    
  }
 
  return (
    <Course course={course} />
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const Total = ({course}) => {
  const parts = course.parts
  const amount = parts.map(part => part.exercises)
  
  return (
    <div>
      <b>
        total of {amount.reduce((a, b) => a + b, 0)} exercises
      </b>
    </div>
  )
}

const Content = ({course}) => {
  const parts = course.parts

  return(
    <ul>
      {parts.map(part => 
        <li key={part.name}>
          <Part name={part.name} exercises={part.exercises}/>
        </li>
      )}
    </ul>
  )
}

const Part = (part) => {
  return(
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

const Header = ({course}) => {
  return(
    <div>
      <h1><p>{course.name}</p></h1>
    </div>
  )
}

export default App