import { useEffect, useState } from "react";
import { getPokemons } from "../services/service";
import CardItem from "./CardItem";
import styled from "styled-components";
import LoadMoreButton from "./LoadMoreButton";

const CardListContainer = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

const LIMIT = 10; // define o limite fixo aqui

const CardList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPokemons() {
            setLoading(true);
            const newPokemons = await getPokemons(LIMIT, offset);
            setPokemons((prev) => [...prev, ...newPokemons]);
            setLoading(false);
        }

        fetchPokemons();
    }, [offset]);

    const handleLoadMore = () => {
        setOffset((prev) => prev + LIMIT);
    };

    return (
        <>
            <CardListContainer>
                {pokemons.map((pokemon) => (
                    <CardItem
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.image}
                    />
                ))}
                {loading && <p>Loading more Pokémon...</p>}
            </CardListContainer>
            <LoadMoreButton onLoadMore={handleLoadMore} />
        </>
    );
};

export default CardList;
