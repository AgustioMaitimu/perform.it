import React from 'react';
import cross from '../public/cross.svg';
import checked from '../public/check-checked.svg';
import unchecked from '../public/check-unchecked.png';

export default function Task(props) {
  const [check, setCheck] = React.useState(props.checked);

  function handleCheck() {
    setCheck((prev) => !prev);
    props.updateChecked(props.identifier);
  }

  function handleDelete() {
    if (window.confirm(`Delete Task '${props.task}'?`)) {
      props.deleteTask(props.identifier);
    }
  }

  return (
    <div id="task-container" className="flex items-center justify-between">
      <div id="task--name" className="flex items-center gap-2">
        <img
          src={check ? checked : unchecked}
          onClick={handleCheck}
          alt=""
          className="w-6 duration-200 ease-in"
        />
        <p
          onClick={handleCheck}
          className={`text-base ${check && 'line-through'} ${
            check && 'text-gray-500'
          } duration-200 ease-in-out`}
        >
          {props.task}
        </p>
      </div>
      <img src={cross} alt="" className="w-3" onClick={handleDelete} />
    </div>
  );
}
