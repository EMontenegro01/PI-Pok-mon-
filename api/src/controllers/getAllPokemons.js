const {Pokemon} = require('../db');

const getAllPokemons = async(req, res)=>{
    try {
        const pokemons = await Pokemon.findAll(); //Obtengo los pokemons de la BD

        //Datos como un arreglo de objetos
        const arrayPokemons = pokemons.map((poke) => ({
            id: poke.id,
            nombre: poke.nombre,
            image: poke.image,
            vida: poke.vida,
            ataque: poke.ataque,
            defensa: poke.defensa,
            velocidad: poke.velocidad,
            altura: poke.altura,
            peso: poke.peso
        }));
    
    return res.status(200).json(arrayPokemons);

    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los Pokemons' });
    }
}

module.exports = getAllPokemons;