import { NoTasksContainer } from "./NoTasks.styles";

interface Props {}

export const NoTasks: React.FC<Props> = () => {
  return (
    <NoTasksContainer>
      <h3>No Tasks</h3>
    </NoTasksContainer>
  );
};
