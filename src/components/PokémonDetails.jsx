import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import typeColors from "../assets/typeColors";
import Header from "./Header";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    margin: 2rem auto;
    padding: 2rem;
    background-color: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.cardText};
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const HeaderPokemonDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
`;

const PokemonImage = styled.img`
    width: 200px;
    height: 200px;
`;

const Name = styled.h1`
    font-size: 2.5rem;
    text-transform: capitalize;
    color: ${({ theme }) => theme.accent};
    margin: 1rem 0 0.5rem;
`;

const TypeList = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const TypeBadge = styled.span`
    background-color: ${({ type }) => typeColors[type] || "#777"};
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-size: 0.9rem;
    text-transform: capitalize;
`;

const Section = styled.div`
    width: 100%;
    margin-top: 2rem;
`;

const SectionTitle = styled.h2`
    color: ${({ theme }) => theme.highlight};
    margin-bottom: 1rem;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.5rem;
`;

const ListItem = styled.li`
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border || theme.highlight};
    padding: 0.6rem 1rem;
    border-radius: 8px;
    text-transform: capitalize;
    font-size: 0.95rem;
    text-align: left;
`;

const AbilityDescription = styled.p`
    font-size: 0.85rem;
    color: ${({ theme }) => theme.subtleText || theme.text};
    margin-top: 0.3rem;
`;

const Button = styled.button`
    background-color: ${({ theme }) => theme.accent};
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    margin-top: 2rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.highlight};
    }
`;

const PokemonDetails = ({toggleTheme, isDark}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [abilitiesDesc, setAbilitiesDesc] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                );
                setPokemon(res.data);

                const descs = {};
                await Promise.all(
                    res.data.abilities.map(async ({ ability }) => {
                        const abRes = await axios.get(ability.url);
                        const enEntry = abRes.data.effect_entries.find(
                            (entry) => entry.language.name === "en"
                        );
                        descs[ability.name] =
                            enEntry?.effect || "No description available.";
                    })
                );

                setAbilitiesDesc(descs);
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <Container>Carregando Pokémon...</Container>;
    if (!pokemon) return <Container>Pokémon não encontrado.</Container>;

    return (
        <>
            <Header onToggleTheme={toggleTheme} isDarkTheme={isDark} />
            <Container>
                <Button onClick={() => navigate("/")}>
                    ← Voltar para a lista
                </Button>

                <HeaderPokemonDetails>
                    <PokemonImage
                        src={
                            pokemon.sprites.other["official-artwork"]
                                .front_default
                        }
                        alt={pokemon.name}
                    />
                    <Name>{pokemon.name}</Name>
                    <TypeList>
                        {pokemon.types.map(({ type }) => (
                            <TypeBadge key={type.name} type={type.name}>
                                {type.name}
                            </TypeBadge>
                        ))}
                    </TypeList>
                </HeaderPokemonDetails>

                <Section>
                    <SectionTitle>Moves</SectionTitle>
                    <List>
                        {pokemon.moves.slice(0, 10).map(({ move }) => (
                            <ListItem key={move.name}>{move.name}</ListItem>
                        ))}
                    </List>
                </Section>

                <Section>
                    <SectionTitle>Abilities</SectionTitle>
                    <List>
                        {pokemon.abilities.map(({ ability }) => (
                            <ListItem key={ability.name}>
                                <strong>{ability.name}</strong>
                                <AbilityDescription>
                                    {abilitiesDesc[ability.name]}
                                </AbilityDescription>
                            </ListItem>
                        ))}
                    </List>
                </Section>
            </Container>
        </>
    );
};

export default PokemonDetails;
