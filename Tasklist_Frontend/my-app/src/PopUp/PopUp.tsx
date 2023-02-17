import s from "./PopUp.styles";
import { Task } from "../types";
import { PopUpContent } from "./PopUpContent";

interface Props {
  setPopUpOn(popUpOn: Boolean): void;
  popUpOn: Boolean;
  task?: Task;
  handleUpdateTasks(id: number, task: Task): void;
}

export const PopUp: React.FC<Props> = (props) => {
  const handleOnClick = () => {
    props.setPopUpOn(false);
  };

  return props.popUpOn ? (
    <s.Popup>
      <s.PopupInner>
        <button onClick={handleOnClick}>X</button>
        <PopUpContent
          setPopUpOn={props.setPopUpOn}
          task={props.task}
          handleUpdateTasks={props.handleUpdateTasks}
        ></PopUpContent>
      </s.PopupInner>
    </s.Popup>
  ) : null;
};
