import axios from "axios";

export async function getPokemons(limit = 10, offset = 0) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const res = await axios.get(url);
        const list = res.data.results;

        const pokemons = list.map((item) => {
            const id = item.url.split("/").filter(Boolean).pop();
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return {
                id: parseInt(id),
                name: item.name,
                image,
            };
        });

        return pokemons;
    } catch (error) {
        console.error("Error searching pokémons:", error);
        return [];
    }
}

export async function getPokemonDetails(id) {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = res.data;

        const abilitiesDesc = {};
        await Promise.all(
            pokemon.abilities.map(async ({ ability }) => {
                const abRes = await axios.get(ability.url);
                const enEntry = abRes.data.effect_entries.find(
                    (entry) => entry.language.name === "en"
                );
                abilitiesDesc[ability.name] =
                    enEntry?.effect || "No description available.";
            })
        );

        return { pokemon, abilitiesDesc };
    } catch (err) {
        console.error("Error fetching Pokémon details:", err);
        throw err;
    }
}
