import s from "./PopUp.styles";
import { AddTask } from "../AddTask/AddTasks";
import { Task } from "../types";

interface Props {
  setPopUpOn(popUpOn: Boolean): void;
  popUpOn: Boolean;
  handleAddTask(task: Task): void;
}

export const PopUpAdd: React.FC<Props> = (props) => {
  const handleOnClick = () => {
    props.setPopUpOn(false);
  };

  return props.popUpOn ? (
    <s.Popup>
      <s.PopupInner>
        <button onClick={handleOnClick}>X</button>
        <AddTask
          setPopUpOn={props.setPopUpOn}
          handleAddTask={props.handleAddTask}
        />
      </s.PopupInner>
    </s.Popup>
  ) : null;
};
