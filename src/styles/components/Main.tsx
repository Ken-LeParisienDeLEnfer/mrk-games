import { styled } from "styled-components";

const Main = styled.main`
    background-color: ${({ theme }) => theme.primaryColor};
    min-height: 100vh;
`;

export default Main;