import s from "./Header.styles";
import { DeleteAll } from "../Delete/DeleteAll";
import b from "../Universal.styles";

interface Props {
  heading: string;
  setPopUpAddOn(popUpOn: Boolean): void;
  popUpAddOn: Boolean;
  handleDeleteAll(): void;
}

export const Header: React.FC<Props> = (props) => {
  const handleButton = () => {
    props.setPopUpAddOn(true);
  };
  return (
    <s.HeaderContainer>
      <DeleteAll handleDeleteAll={props.handleDeleteAll} />
      <s.Title>{props.heading}</s.Title>
      <b.Button1 onClick={handleButton}>Add Task</b.Button1>
    </s.HeaderContainer>
  );
};
