import { Task } from "../types";
import b from "../Universal.styles";

interface Props {
  id?: number;
  handleDelete(id: number | undefined): void;
  task: Task;
}

export const CompletedTaskButton: React.FC<Props> = (props) => {
  const handleClick = () => {
    fetch(`/api/tasks/${props.task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: props.task.title,
        description: props.task.description,
        completed: true,
        inProgress: false,
        priority: props.task.priority,
      }),
    });
    props.handleDelete(props.task.id);
  };
  return (
    <div>
      <b.Button3 onClick={handleClick}>Completed Task</b.Button3>
    </div>
  );
};
