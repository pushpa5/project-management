import { useState } from "react"

export default function NewTask({ onAdd }) {
    const [enteredTask, setEnteredTask] = useState('')

    const handleAddClick = () => {
        onAdd(enteredTask)
        setEnteredTask('')
    }
    return (
        <div className="flex items-center gap-4">
            <input 
            type="text" 
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            onChange={(event) => {setEnteredTask(event.target.value)}} 
            value={enteredTask} />
            <button
                className="text-stone-700 hover:text-stone-950"
                onClick={handleAddClick}>
                Add task
            </button>
        </div>
    )
}