import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {guardarTareas } from "../data/taskManager.ts";
import type { TaskType } from "../types.ts";

interface TaskContextType {
    tasks: TaskType[]
    addTask: (task: Omit<TaskType, 'id' | 'completada' | 'borrada'>) => Promise<void>
    checkTask: (id: number) => Promise<void>
    deleteTask: (id: number) => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

function TaskProvider({ children }: {children: ReactNode}) {

    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        async function fetchTask() { 
            const response = await fetch("http://localhost:3000/task");
            const loadedTasks = await response.json() as TaskType[];

            setTasks(loadedTasks);
        }
        fetchTask();
    }, []);

    const addTask: TaskContextType['addTask'] = async (task) => {

    try {
        const response = await fetch("http://localhost:3000/task",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })

    const newTask = await response.json() as TaskType

    const updatedTasks = [...tasks, newTask]

    alert("Tarea agregada con éxito");
    setTasks(updatedTasks)
    } catch (error) {
        console.error(error)
        alert("Ocurrio un error al agregar la tarea")
    }
    //     const newTask = {
    //         id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
    //         titulo,
    //         descripcion,
    //         completada: false,
    //         borrada: false
    //     };
    //     const updatedTasks = [...tasks, newTask];
    //     setTasks(updatedTasks);
    //     await guardarTareas(updatedTasks);
    // };
    }
    const checkTask: TaskContextType['checkTask'] = async (id) => {

        const response = await fetch(`http://localhost:3000/task/${id}`,{
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH"
        })
    const checkedTask = await response.json() as TaskType

    const updatedTask = tasks.map(task => task.id == checkedTask.id ? checkedTask : task)

    setTasks(updatedTask)
        

        // const index = tasks.findIndex((task) => task.id === id);
        // if(index === -1) return alert("Error al marcar la tarea");
        // const updatedTasks = [...tasks];
        // updatedTasks[index].completada = !updatedTasks[index].completada;
        // setTasks(updatedTasks);
        // await guardarTareas(updatedTasks);
    }

    const deleteTask: TaskContextType['deleteTask'] = async (id) => {
        const index = tasks.findIndex((task) => task.id === id);
        if(index === -1) return alert("Error al borrar la tarea");
        const updatedTasks = [...tasks];
        updatedTasks[index].borrada = true;
        setTasks(updatedTasks);
        await guardarTareas(updatedTasks);
    }

    return(
        <TaskContext.Provider value={{tasks, addTask, checkTask, deleteTask}}>
            {children}
        </TaskContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTask() {
    const context = useContext(TaskContext);
    if(!context) throw new Error("No se puede usar useTask si no estás dentro del TaskProvider");
    return context;
}

export default TaskProvider;