import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

import {
    Container,
    TopSection,
    LeftColumn,
    RightColumn,
    HeaderPokemonDetails,
    PokemonImage,
    Name,
    TypeList,
    TypeBadge,
    Section,
    SectionTitle,
    MovesList,
    MoveItem,
    List,
    ListItem,
    AbilityDescription,
    Button,
} from "./PokemonDetails.styles";

const PokemonDetails = ({ toggleTheme, isDark }) => {
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

    if (loading) return <Container>Loading Pokémon...</Container>;
    if (!pokemon) return <Container>Pokémon not foound.</Container>;

    return (
        <>
            <Header onToggleTheme={toggleTheme} isDarkTheme={isDark} />
            <Container>
                <Button onClick={() => navigate("/")}>
                    ← Voltar para a lista
                </Button>

                <TopSection>
                    <LeftColumn>
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
                    </LeftColumn>

                    <RightColumn>
                        <SectionTitle>Moves</SectionTitle>
                        <MovesList>
                            {pokemon.moves.slice(0, 10).map(({ move }, ) => (
                                <MoveItem key={move.name}>{move.name}</MoveItem>
                            ))}
                        </MovesList>
                    </RightColumn>
                </TopSection>

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
