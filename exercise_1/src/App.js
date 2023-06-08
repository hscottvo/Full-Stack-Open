const Header = (props) => {
    return (
        <h1>{props.title}</h1>
    )
}

const Content = (props) => {
    return (
        <p>
            {props.partName} {props.numExercises}
        </p>
    )
}

const Total = (props) => {
    const sum = props.exerciseList.reduce((a, b) => { return a + b }, 0)
    return (
        <p>
            Number of exercises {sum}
        </p>
    )
}


const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <>
            {/* <h1>{course}</h1> */}
            <Header title={course} />
            {/* <p>
                {part1} {exercises1}
            </p> */}
            <Content partName={part1} numExercises={exercises1} />
            <Content partName={part2} numExercises={exercises2} />
            <Content partName={part3} numExercises={exercises3} />
            {/* <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
            <Total exerciseList={[exercises1, exercises2, exercises3]} />
        </>
    )
}

export default App