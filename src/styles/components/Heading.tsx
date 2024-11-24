import styled from "styled-components";
import React from 'react';

interface HeadingProps {
    level: number; // The heading level (1 for h1, 2 for h2, etc.)
    children: React.ReactNode
}

// Styled component for headings
const StyledHeading = styled.h1`
    font-family: Arial, sans-serif;
    color: ${({ theme }) => theme.tertiaryColor};

    /* Add dynamic styles if needed */
    ${(props) =>
        props.as === "h1" &&
        `
        font-size: 2.5rem;
        font-weight: bold;
    `}
    ${(props) =>
        props.as === "h2" &&
        `
        font-size: 2rem;
        font-weight: semi-bold;
    `}
    ${(props) =>
        props.as === "h3" &&
        `
        font-size: 1.5rem;
        font-weight: normal;
    `}
`;

// Wrapper to dynamically render the correct heading
const Heading: React.FC<HeadingProps> = ({ level, children }) => {
    const tag = `h${level}`;
    return <StyledHeading as={tag}>{children}</StyledHeading>;
};

export default Heading;