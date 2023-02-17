import { ChangeEvent, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import s from "../AddTask/AddTasks.syles";
import { Task } from "../types";

interface Props {
  setPopUpOn(popUpOn: Boolean): void;
  task: Task;
  handleUpdateTasks(id: number, task: Task): void;
}

export const UpdateTask: React.FC<Props> = (props) => {
  const [inProg, setInProgress] = useState<boolean>(
    props.task.inProgress || false
  );
  const [value, setValue] = useState<number>(props.task.priority || 0);
  const [currentTitle, setCurrentTitle] = useState<string>(
    props.task.title || ""
  );
  const [currentDesc, setCurrentDesc] = useState<string>(
    props.task.description || ""
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  const titleHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value.trim());
  };
  const descHandleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentDesc(e.target.value.trim());
  };
  const inProgHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInProgress(e.target.checked);
  };

  const handleButton = () => {
    fetch(`/api/tasks/${props.task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: currentTitle,
        description: currentDesc,
        completed: false,
        inProgress: inProg,
        priority: value,
      }),
    });
    props.handleUpdateTasks(props.task.id || 0, {
      title: currentTitle,
      description: currentDesc,
      completed: false,
      inProgress: inProg,
      priority: value,
    });
    props.setPopUpOn(false);
  };

  return (
    <div>
      <s.centeredDiv>
        <s.titleBox
          type="text"
          value={currentTitle}
          onChange={titleHandleChange}
        />
      </s.centeredDiv>
      <s.centeredDiv>
        <s.instructionBox
          onChange={descHandleChange}
          placeholder="Task Description"
          cols={50}
          rows={5}
          value={currentDesc}
        />
      </s.centeredDiv>

      <p>In Progress</p>
      <input
        type="checkbox"
        id="ip"
        checked={inProg}
        onChange={inProgHandleChange}
      />

      <p>Priority</p>
      <Slider
        aria-label="priority"
        defaultValue={props.task.priority}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={1}
        marks={true}
        min={1}
        max={10}
      ></Slider>
      <button onClick={handleButton}>Update</button>
    </div>
  );
};
