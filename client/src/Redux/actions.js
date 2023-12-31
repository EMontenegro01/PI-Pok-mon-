import {SET_ALL_POKEMONS, SET_ALL_TYPES} from "./action-type";
import axios from "axios";
const BASE_URL = "http://localhost:3001";
export const getAllPokemons = () => {
    return async (dispatch) => {
      try {
        // Realizar una solicitud GET al endpoint de pokemones en tu servidor local
        const response = await axios.get(`${BASE_URL}/pokemons`);
  
        // Despachar la acción para almacenar los datos en el estado de Redux
        dispatch({
          type: SET_ALL_POKEMONS,
          payload: response.data, // Suponiendo que response.data contiene los pokemones
        });
      } catch (error) {
        // Manejar errores si la solicitud falla
        console.error("Error al obtener los pokemones:", error);
      }
    };
  };

  export const getAllTypes = ()=>{
    return async (dispatch)=>{
        try{
            const response = await axios.get(`${BASE_URL}/types`);

            dispatch({
                type: SET_ALL_TYPES,
                payload:response.data
            });
        } catch(error){
            console.error("Error al obtener los tipos:", error);
        }
    }
}