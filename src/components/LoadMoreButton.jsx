import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
`;
const Button = styled.button`
    background-color: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.cardText};
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.highlight}; /* amarelo */
        color: ${({ theme }) =>
            theme.text}; /* texto preto no light e no dark */
    }
`;


const LoadMoreButton = ({ onLoadMore }) => {
    return (
        <ButtonContainer>
            <Button onClick={onLoadMore}>Load more</Button>
        </ButtonContainer>
    );
};

export default LoadMoreButton;
