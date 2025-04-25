import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import SideMenu from "./components/SideMenu";
import SelectProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  const handleProjectSelect = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  const handleStartProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  const handleCancelProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  const newProjectHandler = (projectObj) => {
    setProjectState((prevState) => {
      const projectID = Math.random()
      const newProject = { ...projectObj, id: projectID }
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined,
      }
    })
  }

  const handleAddTask = (text) => {
    setProjectState((prevState) => {
      const taskId = Math.random()
      const newTask = { projectId: prevState.selectedProjectId, id: taskId, text: text }

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      }
    })
  }

  const handleDeleteTask = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      }
    })
  }

  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
        tasks: prevState.tasks.filter(task => task.projectId !== prevState.selectedProjectId)
      }
    })
  }

  const project = projectState.projects?.find(item => item.id === projectState.selectedProjectId)
  let content = <SelectProject
    project={project}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks}
    onDelete={handleDeleteProject} />

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={newProjectHandler} onCancel={handleCancelProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProject onStartProjectClick={handleStartProject} />
  }

  return (
    <main className="h-screen my-8h-screen my-8 flex gap-8">
      <SideMenu
        onStartProjectClick={handleStartProject}
        projects={projectState.projects}
        onSelect={handleProjectSelect}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
