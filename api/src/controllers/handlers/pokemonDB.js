const {Pokemon, Type} = require('../../db');
const { Op } = require('sequelize');

const allPokemonsDB = async()=>{
    try {
        const pokemons = await Pokemon.findAll({
            include:Type,
        })

        const pokemonsWithTypes = pokemons.map(poke=>({
            id: poke.id,
            nombre: poke.name,
            image: poke.sprites.front_default,
            vida: poke.stats.find((stat) => stat.stat.name === 'hp').base_stat,
            ataque: poke.stats.find((stat) => stat.stat.name === 'attack').base_stat,
            defensa: poke.stats.find((stat) => stat.stat.name === 'defense').base_stat,
            velocidad: poke.stats.find((stat) => stat.stat.name === 'speed').base_stat,
            altura: poke.height,
            peso: poke.weight,
            types: poke.types.map((type) => type.type.name), // Obtener tipos
        }));

        return pokemonsWithTypes;
    } catch (error) {
        throw new Error(error.message);
    }
}

const dbByName = async (name) =>{
    try{
        const pokemons = await Pokemon.findAll({
            where:{
                name:{
                    [Op.like]: `%${name}%`
                }
            }
        })
    
        return pokemons
    } catch (error){
        throw new Error(error.message)
    }
}

module.exports = { dbByName, allPokemonsDB };