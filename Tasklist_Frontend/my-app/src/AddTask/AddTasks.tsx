import { useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import s from "./AddTasks.syles";
import { Task } from "../types";

interface Props {
  setPopUpOn(popUpOn: Boolean): void;
  handleAddTask(task: Task): void;
}

export const AddTask: React.FC<Props> = (props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  const inProg = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<number>(5);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleButton = () => {
    const strTitle = titleInput.current?.value.trim();
    const strDes = descriptionInput.current?.value.trim();
    const boolInProg = inProg.current?.checked;
    const newTask: Task = {
      title: strTitle,
      description: strDes,
      completed: false,
      inProgress: boolInProg,
      priority: value,
    };

    if (strTitle === "") {
      alert("You need to input fields for Title and Desciption");
    } else if (strDes === "") {
      alert("You need to input fields for Title and Desciption");
    } else {
      fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: strTitle,
          description: strDes,
          completed: false,
          inProgress: boolInProg,
          priority: value,
        }),
      });
      props.handleAddTask(newTask);
      props.setPopUpOn(false);
    }
  };

  return (
    <div>
      <s.centeredDiv>
        <s.titleBox type="text" ref={titleInput} placeholder="Title" required />
      </s.centeredDiv>
      <s.centeredDiv>
        <s.instructionBox
          ref={descriptionInput}
          placeholder="Task Description"
          cols={50}
          rows={5}
        />
      </s.centeredDiv>

      <p>In Progress</p>
      <input type="checkbox" ref={inProg} id="ip" />

      <p>Priority</p>
      <Slider
        aria-label="priority"
        defaultValue={5}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={1}
        marks={true}
        min={1}
        max={10}
      ></Slider>
      <button onClick={handleButton}>ADD</button>
    </div>
  );
};
