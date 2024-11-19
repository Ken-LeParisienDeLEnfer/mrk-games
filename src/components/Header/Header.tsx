import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components
const StyledHeader = styled.header`
    background-color: ${({ theme }) => theme.primaryColor};
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`;

const AppTitle = styled.span`
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 40px;
    font-family: Impact;
    font-weight: bold;
`;

const Header = () => (
    <StyledHeader>
        <Link to="/">
            <AppTitle>MRK GAMES</AppTitle>
        </Link>
    </StyledHeader>
)

export default Header;
