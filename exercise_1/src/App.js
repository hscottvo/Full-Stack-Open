const Header = (props) => {
  return <h1>{props.title}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.partName} {props.numExercises}
    </p>
  );
};

const Content = (props) => {
  let partsList = []
  props.parts.forEach((part, index) => {
    partsList.push(<Part key={"part" + index} partName={part.name} numExercises={part.exercises} />)
  });
  return (
    <div>
      {partsList}
    </div>
  );
};

const Total = (props) => {
  const sum = props.exerciseList.reduce((previous, curr) => {
    return previous + curr.exercises;
  }, 0);
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ]
  };

  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total exerciseList={course.parts} />
    </>
  );
};

export default App;
