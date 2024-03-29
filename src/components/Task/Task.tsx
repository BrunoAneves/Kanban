import React, { useState, useEffect } from "react";
import style from "./Task.module.css";
import { FaRegTrashAlt } from "react-icons/fa";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const TaskComponent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");


  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask: Task = {
        id: Math.floor(Math.random() * 1000),
        title: newTaskTitle,
        description: newDescription,
        status: "fazer",
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewDescription("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, description: e.target.value };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("id", id.toString());
  };
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: string
  ) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("id");
    const draggedTask = tasks.find((task) => task.id === parseInt(taskId));
    if (draggedTask) {
      const updatedTasks = tasks.filter((task) => task.id !== draggedTask.id);
      const newTaskList = [
        ...updatedTasks,
        { ...draggedTask, status: newStatus },
      ];
      setTasks(newTaskList);
    }
  };

  const handleDelete = (id: number) => {
    const filteredTasks = tasks.filter((val) => val.id !== id);
    setTasks([...filteredTasks]);
  };

  const renderTasks = (status: string) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id}
          className={`${style[status]}`}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
        >
          {<div>{task.title}</div>}

          {
            <textarea
              className={style.textarea}
              value={task.description}
              onChange={(e) => handleDescriptionChange(e, task.id)}
              placeholder="Descrição da tarefa"
            />
          }
          <button
            className={style.button_delete}
            onClick={() => handleDelete(task.id)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ));
  };

  return (
    <>
    
      <div className={style.container_addCards}>
        <input
          className={style.addTaskInput}
          type="text"
          value={newTaskTitle}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          tabIndex={0}
          maxLength={30}
        />
        <button className={style.buttonAdd} onClick={handleAddTask}>
          Adicionar Tarefa
        </button>
      </div>

      <div className={style.container}>
        <div
          className={style.colunmFazer}
          onDrop={(e) => handleDrop(e, "fazer")}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2>A Fazer</h2>
          {renderTasks("fazer")}
        </div>

        <div
          className={style.colunmFazendo}
          onDrop={(e) => handleDrop(e, "fazendo")}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2>Fazendo</h2>
          {renderTasks("fazendo")}
        </div>

        <div
          className={style.colunmFeito}
          onDrop={(e) => handleDrop(e, "feito")}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2>Feito</h2>
          {renderTasks("feito")}
        </div>
      </div>

    </>
  );
};

export default TaskComponent;
