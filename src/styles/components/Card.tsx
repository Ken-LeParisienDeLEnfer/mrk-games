import { Link } from "react-router-dom";
import { styled } from "styled-components";

const CardArticle = styled.article`
    background-color: ${({ theme }) => theme.primaryColor};
    border: 1px solid ${({ theme }) => theme.tertiaryColor};
    color: ${({ theme }) => theme.secondaryColor};
`;

type Props = {
    title: string;
    link: string;
  };
  
  const Card: React.FC<Props> = ({ title, link }) => {
    return (
        <Link to={{
            pathname: `/${link}`
            }}> 
            <CardArticle>
                <h2>{title}</h2>
            </CardArticle>
      </Link>
    );
  };

export default Card;