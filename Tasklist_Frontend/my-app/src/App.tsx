import React, { useEffect, useState } from "react";
import { Header } from "./Header/Header";
import { ViewOptionsHeader } from "./Header/ViewOptionsHeader";
import { Task } from "./types";
import { Tasks } from "./Tasks/Tasks";
import { PopUp } from "./PopUp/PopUp";
import { PopUpAdd } from "./PopUp/PopUpAdd";
import { NoTasks } from "./NoTasks/NoTasks";

export const App = () => {
  const [error, setError] = useState<Boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [popUpOn, setPopUpOn] = useState<Boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task>();
  const [popUpAddOn, setPopUpAddOn] = useState<Boolean>(false);
  const [empty, setEmpty] = useState<Boolean>(true);
  const [taskOptions, setTaskOptions] = useState<number>(0);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleDelete = (id: number | undefined) => {
    const newTasks: Task[] = [];
    tasks.forEach((task) => {
      if (task.id !== id) {
        newTasks.push(task);
      }
    });
    setTasks(newTasks);
  };

  const handleDeleteAll = () => {
    setTasks([]);
  };

  const handleUpdateTasks = (id: number, updatedTask: Task) => {
    const newTasks: Task[] = [];
    tasks.forEach((task) => {
      console.log(task.id);
      if (task.id !== id) {
        newTasks.push(task);
      } else {
        newTasks.push(updatedTask);
      }
    });
    setTasks(newTasks);
  };

  useEffect(() => {
    const taskOptionsStringList = [
      "priority",
      "inProgress",
      "toBeStarted",
      "completed",
      "priority",
    ];
    fetch(`/api/tasks/${taskOptionsStringList[taskOptions]}`, { method: "GET" })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setTasks([]);
        }
      })
      .then((JSONresponse: Task[] | null) => {
        return JSONresponse;
      })
      .then((tasks) => {
        if (tasks) {
          setTasks(tasks);
          setError(false);
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      })
      .catch((error) => {
        setError(true);
      });
  }, [taskOptions]);

  return (
    <div>
      <Header
        heading="Task List"
        setPopUpAddOn={setPopUpAddOn}
        popUpAddOn={popUpAddOn}
        handleDeleteAll={handleDeleteAll}
      />
      <ViewOptionsHeader setTaskOptions={setTaskOptions} />
      <PopUpAdd
        setPopUpOn={setPopUpAddOn}
        popUpOn={popUpAddOn}
        handleAddTask={handleAddTask}
      />
      <PopUp
        setPopUpOn={setPopUpOn}
        popUpOn={popUpOn}
        task={currentTask}
        handleUpdateTasks={handleUpdateTasks}
      />
      {!empty ? (
        tasks.map((task) => (
          <Tasks
            key={task.id}
            task={task}
            setCurrentTask={setCurrentTask}
            setPopUpOn={setPopUpOn}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <NoTasks />
      )}
    </div>
  );
};
