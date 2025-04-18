import { useState } from 'react'
const Header = (props) => {
    return <h1>{props.course}</h1>
}
const Content = (props) => {
    const listItems = props.rows.map((row) => (
        <p>
            {row.part} {row.exercise}
        </p>
    ))
    return <>{listItems}</>
}
const Part = (props) => {
    return (
        <p>
            {props.data.name} {props.data.exercises}
        </p>
    )
}
const Total = (props) => {
    const sum = props.data.reduce((acc, curr) => acc + curr.exercises, 0)
    return <p>Number of exercises {sum}</p>
}

const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>
}
const PropsLearning = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10,
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7,
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14,
    }
    const [buttonCounter, setButtonCounter] = useState(0)
    const [clicks, setClicks] = useState({ left: 0, right: 0 })
    const [allClicks, setAllClicks] = useState([])
    const [totalClicks, setTotalClicks] = useState(0)

    const increment = () => {
        console.log('Incrementing from value', buttonCounter)
        setButtonCounter(buttonCounter + 1)
        const newClicks = {
            ...clicks,
            left: clicks.left + 1,
        }
        setClicks(newClicks)
        setAllClicks(allClicks.concat('L'))
        setTotalClicks(newClicks.left + newClicks.right)
    }
    const decrement = () => {
        console.log('Decrementing from value', buttonCounter)
        setButtonCounter(buttonCounter - 1)
        const newClicks = {
            ...clicks,
            right: clicks.right + 1,
        }
        setClicks(newClicks)
        setAllClicks(allClicks.concat('R'))
        setTotalClicks(newClicks.left + newClicks.right)
    }

    return (
        <>
            <Header course={course} />
            <Part data={part1} />
            <Part data={part2} />
            <Part data={part3} />
            <Total data={[part1, part2, part3]} />
            {/* <p>{counter}</p> */}
            <p>{buttonCounter}</p>
            <Button onClick={increment} text={'+1'} />
            <Button onClick={decrement} text={'-1'} />
            <p>
                left: {clicks.left} right: {clicks.right}
            </p>
            <p>{allClicks.join(' ')}</p>
            <p>Total: {totalClicks}</p>
        </>
    )
}

const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    return total > 0 ? (
        <table>
            <tbody>
                <StatisticsLine text="good" value={good} />
                <StatisticsLine text="neutral" value={neutral} />
                <StatisticsLine text="bad" value={bad} />
                <tr>
                    <td>all</td>
                    <td>{total}</td>
                </tr>
                <tr>
                    <td> average</td>
                    <td>{(good - bad) / total} </td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{(good * 100) / total}%</td>
                </tr>
            </tbody>
        </table>
    ) : (
        <p>No feedback given</p>
    )
}

const CafeButton = ({ handler, text }) => {
    return <button onClick={handler}>{text}</button>
}

const Unicafe = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodHandler = () => {
        console.log('incrementing good from', good)
        setGood(good + 1)
    }

    const neutralHandler = () => {
        console.log('incrementing neutral from', neutral)
        setNeutral(neutral + 1)
    }

    const badHandler = () => {
        console.log('incrementing bad from', bad)
        setBad(bad + 1)
    }

    return (
        <>
            <h1>give feedback</h1>
            <CafeButton handler={goodHandler} text={'good'} />
            <CafeButton handler={neutralHandler} text={'neutral'} />
            <CafeButton handler={badHandler} text={'bad'} />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

const VoteCounts = ({ counts, voteCount }) => {
    console.log(counts)
    let items = Object.entries(counts).map(([key, value]) => (
        <table>
            <thead>
                <tr key={key}>
                    <td>key: {key}</td>
                    <td>value: {value}</td>
                </tr>
            </thead>
        </table>
    ))
    return (
        <>
            <p>Current anecdote has {voteCount} votes</p>
            {items}
        </>
    )
}

const MostVotedAnecdote = ({ counts, anecdotes }) => {
    if (Object.keys(counts).length > 0) {
        let index = Object.keys(counts).reduce((a, b) =>
            counts[a] > counts[b] ? a : b
        )
        console.log('i love poop')
        console.log(counts)
        console.log(index)
        return (
            <>
                <a>{anecdotes[index]}</a>
                <br />
                <a>
                    has {counts[index]} vote{counts[index] > 1 ? 's' : ''}
                </a>
            </>
        )
    } else {
        return <p>No votes have been cast!</p>
    }
}

const Anecdotes = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState({})

    const nextHandler = () =>
        setSelected(Math.floor(Math.random() * anecdotes.length))
    const voteHandler = (index) => () => {
        console.log(index)
        console.log(votes)
        if (index in votes) {
            const newVotes = { ...votes, [index]: votes[index] + 1 }
            console.log('new:', newVotes)
            setVotes(newVotes)
        } else {
            const newVotes = { ...votes, [index]: 1 }
            console.log('new:', newVotes)
            setVotes(newVotes)
        }
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <br />
            <VoteCounts counts={votes} voteCount={votes[selected]} />
            <button onClick={voteHandler(selected, votes)}>vote</button>
            <button onClick={nextHandler}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <MostVotedAnecdote counts={votes} anecdotes={anecdotes} />
        </div>
    )
}

const App = () => {
    const render = 'anecdotes'
    switch (render) {
        case 'props':
            return <PropsLearning />
        case 'unicafe':
            return <Unicafe />
        case 'anecdotes':
            return <Anecdotes />
    }
}

export default App
