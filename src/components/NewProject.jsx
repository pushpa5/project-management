import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {
    const titleRef = useRef()
    const descriptionRef = useRef()
    const dueDateRef = useRef()
    const modal = useRef()

    const handleSave = () => {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredDueDate = dueDateRef.current.value;

        // validation
        if (enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === '') {
            modal.current.open()
        } else {
            onAdd({
                title: enteredTitle,
                description: enteredDescription,
                duedate: enteredDueDate,
            })
        }
    }

    return (
        <>
            <Modal ref={modal} buttonLabel="Close">
                <h2 className="text-xl font-bold text-stone-500 my-4">Invalid Input</h2>
                <p className="text-stone-700 mb-4">Ooops.. you forgot to enter the value</p>
                <p className="text-stone-700 mb-4">Please make sure to provide a valid value for every input field</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input ref={titleRef} label="Title" />
                    <Input ref={descriptionRef} label="Description" isTextArea />
                    <Input type="date" ref={dueDateRef} label="Due date" />
                </div>
            </div>
        </>
    )
}