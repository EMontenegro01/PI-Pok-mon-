const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getPokemonById = async (req, res) => {
  const { idPokemon } = req.params;

  try {
    // Buscar el Pokémon en la base de datos local
    if(isNaN(idPokemon)){
      const localPokemon = await Pokemon.findOne({
        where: { id: idPokemon },
        include: Type, // Incluye el tipo del Pokémon
      });  
      if (localPokemon) {
        // Si se encuentra en la base de datos local, devuelve los detalles locales
        return res.status(200).json(localPokemon);
      }
    }
  else{
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);

    if (data.name) {
      const pokemon = {
        id: data.id,
        nombre: data.name,
        image: data.sprites.front_default,
        vida: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        ataque: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        defensa: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        velocidad: data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
        altura: data.height,
        peso: data.weight,
        types: data.types.map((type) => type.type.name), // Obtener tipos
      };
      return res.status(200).json(pokemon);
    }

    return res.status(404).send('Pokemon Not found');
  }
    // Si no se encuentra en la base de datos local, realiza una solicitud a la API
 
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
};

module.exports = getPokemonById;
