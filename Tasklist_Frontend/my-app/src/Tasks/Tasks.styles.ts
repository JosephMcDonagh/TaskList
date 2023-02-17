import styled from "styled-components";

const OverallTaskContainer = styled.div``;

const TaskContainerInPro = styled.div`
  display: flex;
  margin: 1em auto;
  width: 75vw;
  background-color: #fefcaf;
  border: thick double #32a1ce;
  padding: 1em;
`;

const TaskContainerNotInPro = styled.div`
  display: flex;
  margin: 1em auto;
  width: 75vw;
  border: thick double #32a1ce;
  padding: 1em;
`;

const TaskContainerComp = styled.div`
  display: flex;
  margin: 1em auto;
  width: 75vw;
  background-color: #d1fdc4;
  border: thick double #32a1ce;
  padding: 1em;
`;

const TaskTitle = styled.div`
  size: 2em;
  width: 20vw;
  text-align: center;
  margin: 1em;
`;

const TaskDescription = styled.div`
  size: 1.75em;
  width: 45vw;
  margin: 1em;
`;

const Prio = styled.div`
  size: 1.75em;
  width: 10vw;
  margin: 1em;
`;

const invisibleButton = styled.button`
  color: white;
  background-color: white;
  border: 0;
  padding: 1em;
`;

const styles = {
  TaskContainerInPro,
  TaskContainerNotInPro,
  TaskContainerComp,
  TaskTitle,
  TaskDescription,
  Prio,
  invisibleButton,
  OverallTaskContainer,
};

export default styles;
