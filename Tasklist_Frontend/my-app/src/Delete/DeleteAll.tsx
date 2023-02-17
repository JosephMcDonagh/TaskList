import b from "../Universal.styles";

interface Props {
  handleDeleteAll(): void;
}

export const DeleteAll: React.FC<Props> = (props) => {
  const handleClick = () => {
    fetch(`/api/tasks`, { method: "DELETE" });
    props.handleDeleteAll();
  };

  return <b.Button1 onClick={handleClick}>Clear Tasks</b.Button1>;
};
