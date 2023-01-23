const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const coursetable = courses.map((course) => 
    <li key={course.id}><Course course={course} /></li>
  )
  
  return (
    <div>
      <h1>Web development curriculum</h1>
      <ul>
        {coursetable}
      </ul>
    </div>
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
      <h2><p>{course.name}</p></h2>
    </div>
  )
}

export default App