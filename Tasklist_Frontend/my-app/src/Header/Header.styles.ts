import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  margin: 2em auto;
  justify-content: space-between;
  margin-bottom: 0;
`;

const AddButton = styled.div`
  align-content: center;
  align-items: center;
  align-self: center;
  margin: 2em;
  margin-bottom: 0.2em;
  margin-top: 0.2em;
`;

const OptionsContainer = styled.div`
  display: flex;
  margin: 1em auto;
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 3em;
  font-weight: 700;
`;

const styles = {
  HeaderContainer,
  AddButton,
  OptionsContainer,
  Title,
};

export default styles;
