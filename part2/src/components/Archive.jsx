import { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import Note from "./Note";
import PhonebookService from "../services/PhonebookService";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  let handleNoteChange = (event) => {
    console.log("event:", event.target.value);
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newPhoneNumber,
  handlePhoneNumberChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ people, filter, messageHandler }) => {
  const [peopleList, setPeopleList] = useState([]);
  useEffect(() => {
    setPeopleList(people);
  }, [people]);
  const handleDeletePerson = (id, name) => {
    const deleteResponse = PhonebookService.deleteNumber(
      id,
      name,
      messageHandler,
    );
    deleteResponse.then((response) => {
      setPeopleList(peopleList.filter((obj) => obj.id !== id));
    });
  };

  return (
    <>
      {peopleList
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}, it is{" "}
            {person.number?.length % 2 == 1 ? "odd" : "even"}
            <button onClick={() => handleDeletePerson(person.id, person.name)}>
              delete
            </button>
          </div>
        ))}
    </>
  );
};

const Phonebook = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(persons);
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      setPersons(persons.concat({ name: newName, number: newPhoneNumber }));
      setNewName("");
      setNewPhoneNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h3>Numbers</h3>
      <Persons people={persons} filter={filter} />
    </div>
  );
};

const ServerData = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  };

  useEffect(hook, []);
  console.log("render", notes.length, "notes");

  let handleNoteChange = (event) => {
    console.log("event:", event.target.value);
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

const NumNotification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  console.log("poopoo", message, type);
  switch (type) {
    case "add":
      return <div className="added">Added {message}</div>;
    case "alreadyDeleted":
      return (
        <div className="alreadyDeleted">
          Information of {message} has already been removed from server
        </div>
      );
  }
};

const PhonebookAxios = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    PhonebookService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(persons);
    const newObject = { name: newName, number: newPhoneNumber };
    const objectResponse = PhonebookService.createNumber(newObject);
    objectResponse.then((returnedObject) => {
      if (returnedObject != null) {
        console.log("new");
        if (persons.some((person) => person.id === returnedObject.id)) {
          setPersons(
            persons.map((person) =>
              person.id === returnedObject.id ? returnedObject : person,
            ),
          );
        } else {
          setPersons(persons.concat(returnedObject));
        }
        setNewName("");
        setNewPhoneNumber("");
        setMessage(newName);
        setType("add");
      }
    });
  };

  const messageHandler = (message, type) => {
    console.log(message, type);
    setMessage(message);
    setType(type);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NumNotification message={message} type={type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        people={persons}
        filter={filter}
        messageHandler={messageHandler}
      />
    </div>
  );
};

export { Notes, Phonebook, ServerData, PhonebookAxios };
