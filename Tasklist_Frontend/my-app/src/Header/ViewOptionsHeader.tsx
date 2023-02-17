import s from "./Header.styles";
import b from "../Universal.styles";

interface Props {
  setTaskOptions(taskOptions: number): void;
}

export const ViewOptionsHeader: React.FC<Props> = (props) => {
  const handleAll = () => {
    props.setTaskOptions(0);
  };
  const handleInProg = () => {
    props.setTaskOptions(1);
  };
  const handleTBS = () => {
    props.setTaskOptions(2);
  };
  const handleComple = () => {
    props.setTaskOptions(3);
  };
  return (
    <s.OptionsContainer>
      <b.Button2 onClick={handleAll}>All Tasks</b.Button2>
      <b.Button2 onClick={handleInProg}>In Progress Tasks</b.Button2>
      <b.Button2 onClick={handleTBS}>Tasks To Be Started</b.Button2>
      <b.Button2 onClick={handleComple}>Completed Tasks</b.Button2>
    </s.OptionsContainer>
  );
};
