import axios from "axios";


 const instance = axios.create({
    baseURL:"https://pokeapi.co/api/v2/",
    headers: {
        accept: 'application/json',
        // Authorization:
      
    }  
})

export default instance