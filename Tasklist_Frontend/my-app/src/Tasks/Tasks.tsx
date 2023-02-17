import { Delete } from "../Delete/Delete";
import { Task } from "../types";
import s from "./Tasks.styles";
import { CompletedTaskButton } from "../CompletedTaskButton/CompletedTaskButton";
import b from "../Universal.styles";

interface Props {
  task: Task;
  setCurrentTask(currentTask: Task): void;
  setPopUpOn(popUpOn: Boolean): void;
  handleDelete(id: number): void;
}

export const Tasks: React.FC<Props> = (props) => {
  const handleClick = () => {
    props.setCurrentTask(props.task);
    props.setPopUpOn(true);
  };

  return (
    <s.OverallTaskContainer>
      {props.task.completed ? (
        <s.TaskContainerComp>
          <s.TaskTitle>{props.task.title}</s.TaskTitle>
          <s.TaskDescription>{props.task.description}</s.TaskDescription>
          <s.Prio>Prio: {props.task.priority}</s.Prio>
          <Delete id={props.task.id} handleDelete={props.handleDelete}></Delete>
          <b.Button3 onClick={handleClick}>Update Task</b.Button3>
        </s.TaskContainerComp>
      ) : props.task.inProgress ? (
        <s.TaskContainerInPro>
          <s.TaskTitle>{props.task.title}</s.TaskTitle>
          <s.TaskDescription>{props.task.description}</s.TaskDescription>
          <s.Prio>Prio: {props.task.priority}</s.Prio>
          <Delete id={props.task.id} handleDelete={props.handleDelete}></Delete>
          <b.Button3 onClick={handleClick}>Update Task</b.Button3>
          <CompletedTaskButton
            task={props.task}
            handleDelete={props.handleDelete}
          />
        </s.TaskContainerInPro>
      ) : (
        <s.TaskContainerNotInPro>
          <s.TaskTitle>{props.task.title}</s.TaskTitle>
          <s.TaskDescription>{props.task.description}</s.TaskDescription>
          <s.Prio>Prio: {props.task.priority}</s.Prio>
          <Delete id={props.task.id} handleDelete={props.handleDelete}></Delete>
          <b.Button3 onClick={handleClick}>Update Task</b.Button3>
          <CompletedTaskButton
            task={props.task}
            handleDelete={props.handleDelete}
          />
        </s.TaskContainerNotInPro>
      )}
    </s.OverallTaskContainer>
  );
};
