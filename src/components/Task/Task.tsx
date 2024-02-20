import React, { useState } from "react";
import style from "./Task.module.css";

interface Task {
    id: number;
    title: string;
    status: string;
}

const Task = () => {
    const [tasks, setTasks] = React.useState<Task[]>([
        { id: 1, title: "Tarefa 1", status: "fazer" },
        { id: 2, title: "Tarefa 2", status: "fazendo" },
        { id: 3, title: "Tarefa 3", status: "feito" },
    ]);
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const handleAddTask = () => {
        if (newTaskTitle.trim() !== "") {
            const newTask: Task = {
                id: tasks.length + 1,
                title: newTaskTitle,
                status: "fazer",
            };
            setTasks([...tasks, newTask]);
            setNewTaskTitle("");
        }
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
        const updatedTasks = tasks.map((task) => {
            if (task.id === parseInt(taskId)) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const renderTasks = (status: string) => {
        console.log(status);
        return tasks
            .filter((task) => task.status === status)
            .map((task) => (
                <div
                    key={task.id}
                    className={`${style[status]}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                >
                    {task.title}
                </div>
            ));
    };

    return (
        <>
            <div>
                <input type="text" value={newTaskTitle} onChange={handleInputChange} />
                <button onClick={handleAddTask}>Adicionar Tarefa</button>
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

export default Task;
