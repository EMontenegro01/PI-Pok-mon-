const { Pokemon, Type } = require('../../db');
const { Op } = require('sequelize');

const allPokemonsDB = async () => {
  try {
    const pokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: {attributes: [],},
      }
      
    });
    
    return pokemons
    
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