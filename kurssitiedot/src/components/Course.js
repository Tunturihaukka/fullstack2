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

  export default Course