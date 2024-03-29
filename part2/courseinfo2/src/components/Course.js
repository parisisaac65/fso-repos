
const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
    <>
    {parts.map((part) => (
    <Part key={part.id} part={part} />
    ))}
    </>

    
const Course = ({ course }) => {
    // const total = course.parts.reduce(function(sum, part) {
    //     return sum + part.exercises
    // },0)
  
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={total} />
    </div>
    )
}
  

export default Course