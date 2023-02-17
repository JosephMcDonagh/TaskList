import { Task } from "../types";
import { UpdateTask } from "../UpdateTask/UpdateTask";

interface Props {
  task?: Task;
  setPopUpOn(popUpOn: Boolean): void;
  handleUpdateTasks(id: number, task: Task): void;
}

export const PopUpContent: React.FC<Props> = (props) => {
  return props.task ? (
    <UpdateTask
      task={props.task}
      setPopUpOn={props.setPopUpOn}
      handleUpdateTasks={props.handleUpdateTasks}
    />
  ) : (
    <div></div>
  );
};
