import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
    background-color: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.text};
    text-align: center;
    padding: 1rem 0;
    border-top: 1px solid ${({ theme }) => theme.accent};
    font-size: 0.9rem;
    margin-top: 2rem;
`;

const Link = styled.a`
    color: ${({ theme }) => theme.highlight};
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const Footer = () => {
    return (
        <FooterContainer>
            Made by{" "}
            <Link
                href="https://github.com/yoruwitch"
                target="_blank"
                rel="noopener noreferrer"
            >
                Evelyn Fernandes
            </Link>
        </FooterContainer>
    );
};

export default Footer;
