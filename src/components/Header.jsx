import React from "react";
import styled from "styled-components";

const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 1rem 2rem;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border-bottom: 2px solid ${({ theme }) => theme.text};
    margin: 15px;
    border-radius: 8px;
    transition: background 0.3s ease, color 0.3s ease;
`;

const Logo = styled.img`
    width: 120px;
    height: auto;
    border-radius: 8px;
    filter: ${({ theme }) =>
        theme.name === "dark" ? "drop-shadow(0 0 5px #ffcb05)" : "none"};
`;

const Header = ({ onToggleTheme, isDarkTheme }) => {
    return (
        <Container>
            <Logo
                src={'src/assets/images/International_Pokémon_logo.svg'}
                alt="Pokémon logo"
            />
            <h1>Pokédex</h1>
            <button onClick={onToggleTheme} aria-label="Change theme">
                {isDarkTheme ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width={24}
                        height={24}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        width={24}
                        height={24}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                    </svg>
                )}
            </button>
        </Container>
    );
};

export default Header;
