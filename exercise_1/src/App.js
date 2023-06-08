const Header = (props) => {
    return (
        <h1>{props.title}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.partName} {props.numExercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part partName={props.name1} numExercises={props.ex1} />
            <Part partName={props.name2} numExercises={props.ex2} />
            <Part partName={props.name3} numExercises={props.ex3} />
        </div>
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
            <Header title={course} />
            <Content name1={part1} name2={part2} name3={part3}
                ex1={exercises1} ex2={exercises2} ex3={exercises3} />
            <Total exerciseList={[exercises1, exercises2, exercises3]} />
        </>
    )
}

export default App