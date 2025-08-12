import { useState } from "react";
import type { TaskType } from "../types";
// import { useTask} from "../Contexts/TaskFormContext";

import trash from "/TaskListFront/icons/trash.svg"
import copy from "/TaskListFront/icons/copy.svg"
import check from "/TaskListFront/icons/check.svg"

interface CheckBoxProps {
    completeHook: {
        completada:  boolean,
        turnCompleted: () => void 
    }
}

const CheckBox = ({ completeHook: { completada, turnCompleted } }: CheckBoxProps) => {

    // const [active, setActive] = useState(false)
  return (
    <div
      className="w-10 aspect-square bg-blue-100 flex border-1 border-blue-300 rounded-md cursor-pointer justify-center items-center overflow-hidden" onClick={turnCompleted}>
      {completada && (<img src={check} alt="check" className="w-full  bg-blue-300"/>)}
    </div>
  );
};

interface TaskProps {
    tareaProp: TaskType
}

function Task({ tareaProp: { titulo, descripcion, completada ,id } }: TaskProps) {
    console.log(id)
  const [more, setMore] = useState(false);
//   const [completed, setCompleted] = useState(completada);
//   const { checkTask, deleteTask} = useTask()

  const turnCompleted = () => {
    // setCompleted(!completed);
    // checkTask(id)
  };

  const copyTask = async ()=>{
        const copiable = `${titulo}:\n${descripcion}`

        try {
            await navigator.clipboard.writeText(copiable)
            alert("Tarea copiada en el portapapeles")
        } catch (error) {
            console.error(error)
            alert("Ocurrio un error al copiar en el portapapeles")
        }
    }

  return (
    <div
      className="bg-white shadow-md p-4 flex space-x-4 items-center rounded-lg">
      <CheckBox completeHook={{ completada, turnCompleted }} />

      <div className={`${ completada ? "line-through opacity-50" : ""} flex flex-col w-full select-none cursor-pointer`} onClick={()=>setMore(!more)}>
        <span className="font-bold text-xl">{titulo}</span>
        <p className={`text-sm ${more ? "line-clamp-none" : "line-clamp-2"}`}>
          {descripcion}
        </p>
      </div>
      <button
        type="button"
        className="flex p-2 items-center justify-center w-10 h-10 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer select-none aspect-square"
      >
        <img src={trash} alt="borrar" className="w-full" />
      </button>
      <button
        type="button"
        className="flex p-2 items-center justify-center w-10 h-10 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer select-none aspect-square" onClick={copyTask}
      >
        <img src={copy} alt="copiar" className="w-full" />
      </button>
    </div>
  );
}

export default Task;
