import b from "../Universal.styles";

interface Props {
  id?: number;
  handleDelete(id: number | undefined): void;
}

export const Delete: React.FC<Props> = (props) => {
  const handleClick = () => {
    fetch(`/api/tasks/${props.id}`, { method: "DELETE" });
    props.handleDelete(props.id);
  };

  return <b.Button3 onClick={handleClick}>Delete</b.Button3>;
};
