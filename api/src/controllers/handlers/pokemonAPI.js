const axios = require('axios');

const allPokemonsAPI = async()=>{
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/'
        let pokemons = [];
        do {
           
            let info = await axios.get(url);
            /* console.log(apiRequest.data) */
            let pokemonsApi = info.data
        
            let auxPokemons = pokemonsApi.results.map((poke)=>{
                return{
                    name: poke.name,
                    url: poke.url
                }
            });
            pokemons.push(...auxPokemons);
            url = pokemonsApi.next;
        } while (url!=null && pokemons.length < 151);
        
        let pokesWithData = await Promise.all(pokemons.map(async e=>{
            let pokemon = await axios.get(e.url);
            return{
                id: pokemon.data.id,
                nombre: pokemon.data.name,
                image: pokemon.data.sprites.front_default,
                vida: pokemon.data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
                ataque: pokemon.data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
                defensa: pokemon.data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
                velocidad: pokemon.data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
                altura: pokemon.data.height,
                peso: pokemon.data.weight,
                types: pokemon.data.types.map((type) => type.type.name), // Obtener tipos
            }
        }))
       
        return (pokesWithData);
    } catch (error) {
        throw new Error(error.message);
    }
 
    
}

module.exports = { allPokemonsAPI };