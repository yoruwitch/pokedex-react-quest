import { useEffect, useState } from "react";
import { getPokemons } from "../services/service";
import CardItem from "./CardItem";
import styled from "styled-components";

const CardListContainer = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

const CardList = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function fetchPokemons() {
            const data = await getPokemons(); // usa seu serviço, retorna lista de pokémons
            setPokemons(data);
        }
        fetchPokemons();
    }, []);

    return (
        <CardListContainer>
            {pokemons.map((pokemon) => (
                <CardItem
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                />
            ))}
        </CardListContainer>
    );
};

export default CardList;
