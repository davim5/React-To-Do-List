import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle!==''){

      setTasks([...tasks,{
        title: newTaskTitle,
        isComplete: false,
        id: Math.random()
      }])
    }
  }
  console.log(newTaskTitle)
  console.log(tasks)

  function handleToggleTaskCompletion(id: number) {
    // Atualizando o array
    const updatedTasks:Task[] = tasks.map(task => { 
      // Encontrando a task pelo id
      if(task.id == id){
        // Modificando a task e retornando a task modificada (Inverter isComplete)
        return {...task,isComplete:!task.isComplete}
      }

      // Armazenando array modificado na variável updatedTaks
      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
      const remainingTasks = tasks.filter(task =>{
        if(id!==task.id)
          return task;
      })

      setTasks(remainingTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}