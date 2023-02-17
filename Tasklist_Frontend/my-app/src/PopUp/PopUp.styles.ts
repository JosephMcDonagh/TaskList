import styled from "styled-components";

const PopUpBox = styled.div`
  padding: 1em;
  margin: 1em auto;
  display: flex;
  align-items: center;
  width: auto;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

const PopupInner = styled.div`
  position: relative;
  padding: 32px;
  padding-top: 12px;
  width: 80%;
  max-width: 700px;
  background-color: #fff;
  opacity: 1;
  z-index: 10;
  border-radius: 8px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  > button {
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    display: inline-block;
    padding: 8px 16px;
    vertical-align: middle;
    overflow: hidden;
    background-color: inherit;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 14pt;
  }
`;

const popUpContent = styled.div`
  display: flex;
  margin: 1em;
`;

const styles = {
  PopUpBox,
  Popup,
  PopupInner,
  popUpContent,
};
export default styles;
