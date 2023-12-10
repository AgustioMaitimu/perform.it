import { useState, useEffect } from 'react';
import Task from './Task';
import icon from '../public/icon.svg';

export default function App() {
  const [taskInput, setTaskInput] = useState('');
  const [storedNotes, setStoredNotes] = useState([]);

  useEffect(() => {
    const storedNotesFromLocalStorage =
      JSON.parse(localStorage.getItem('storedNotes')) || [];
    setStoredNotes(storedNotesFromLocalStorage);
  }, []);

  function handleTaskInputChange(event) {
    setTaskInput(event.target.value);
  }

  function handleTaskButtonClick() {
    if (taskInput.trim() !== '') {
      const newNote = {
        task: taskInput,
        key: Math.floor(Math.random() * 100000000),
        identifier: Math.floor(Math.random() * 100000000),
        checked: false,
      };

      setStoredNotes((prevNotes) => [...prevNotes, newNote]);
      localStorage.setItem(
        'storedNotes',
        JSON.stringify([...storedNotes, newNote]),
      );

      setTaskInput('');
    }
  }

  function updateChecked(identifier) {
    const updatedArray = storedNotes.map((task) =>
      task.identifier === identifier
        ? { ...task, checked: !task.checked }
        : task,
    );
    setStoredNotes(updatedArray);
    localStorage.setItem('storedNotes', JSON.stringify(updatedArray));
  }

  function deleteTask(identifier) {
    const updatedArray = storedNotes.filter(
      (task) => task.identifier !== identifier,
    );
    setStoredNotes(updatedArray);
    localStorage.setItem('storedNotes', JSON.stringify(updatedArray));
  }

  const renderedTasks = storedNotes.map((note) => (
    <Task
      key={note.key}
      task={note.task}
      identifier={note.identifier}
      checked={note.checked}
      deleteTask={deleteTask}
      updateChecked={updateChecked}
    />
  ));

  return (
    <div className="app my-8 w-fit rounded-lg bg-white p-8 transition-transform">
      <div id="widgets--container" className="flex flex-col gap-5">
        <div id="title-container" className="flex gap-2">
          <img src={icon} alt="" className="w-8" />
          <h3 className="text-dimPink text-2xl font-semibold">To-Do List</h3>
        </div>
        <form id="input--container" className="bg-lightGray rounded-full">
          <input
            id="task-input"
            type="text"
            name="task"
            placeholder="Write Task"
            value={taskInput}
            onChange={handleTaskInputChange}
            className="bg-lightGray w-44 truncate rounded-l-full pl-6 pr-2 text-sm md:w-80"
          />
          <button
            id="task-button"
            onClick={handleTaskButtonClick}
            className="bg-veryDarkBlue rounded-full border px-10 py-2 text-sm text-white md:py-3"
          >
            add
          </button>
        </form>
      </div>
      <div id="tasks" className="mt-8 flex flex-col gap-4 text-sm">
        {renderedTasks}
      </div>
    </div>
  );
}
