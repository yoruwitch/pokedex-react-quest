import axios from "axios";

export async function getPokemons(limit = 10, offset = 0) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const res = await axios.get(url);
        const lista = res.data.results;

        const pokemons = lista.map((item) => {
            const id = item.url.split("/").filter(Boolean).pop(); // pega o número da URL
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return {
                id: parseInt(id),
                name: item.name,
                image,
            };
        });

        return pokemons;
    } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
        return [];
    }
}
