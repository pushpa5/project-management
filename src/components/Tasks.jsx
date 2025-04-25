import { useContext } from "react";
import NewTask from "./NewTask";
import { ProjectContext } from "../store/Project-context";

export default function Tasks({ selectedProjectID }) {
    const { tasks, onDeleteTask } = useContext(ProjectContext)
    const filteredTask = tasks?.filter((task) => task?.projectId === selectedProjectID)
    
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask />
            {filteredTask.length === 0 ?
                <p className="text-stone-800 my-4">This Project do not have any tasks yet</p> :
                <ul className="p-4 mt-8 rounded-md bg-stone-100">
                    {filteredTask.map(task => <li key={task.id} className="flex justify-between my-4">
                        <span>{task.text}</span>
                        <button onClick={() => onDeleteTask(task.id)} className="text-stone-700 hover:text-red-500">Clear</button>
                    </li>)}
                </ul>
            }
        </section>
    )
}