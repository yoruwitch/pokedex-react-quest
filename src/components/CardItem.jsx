import React from "react";
import styled from "styled-components";

const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    width: 20%;
    margin: 10px;

    &:hover {
        transform: scale(1.03);
    }
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
`;

const Name = styled.h3`
    margin: 0.5rem 0 0.2rem;
    font-size: 1.1rem;
    text-transform: capitalize;
`;

const Id = styled.p`
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.subtleText || theme.text};
`;

const CardItem = ({ name, id, image }) => {
    return (
        <Card>
            <Image src={image} alt={name} />
            <Name>{name}</Name>
            <Id>#{id.toString().padStart(3, "0")}</Id>
        </Card>
    );
};

export default CardItem;
