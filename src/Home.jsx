import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from './Card';
import './App.css'
import Dropdown from './Dropdown';

function Home() {
  const[category , setcategory] = useState("all")
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  document.title = "pokemon " + category;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        const { results } = response.data;
        console.log(results);
        
        const pokemonDataPromises = results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          // console.log(pokemonResponse.data.types[0].type.name)
          return pokemonResponse.data;
        });



        
      
        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemonList([...pokemonList, ...pokemonData]); // Append new data to existing list
        
      
        setLoading(false);

      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      }
    };

  fetchData();
  }, [offset, category]); 

  const fetchMorePokemon = () => {
    setOffset(prevOffset => prevOffset + 20); 
  };
  console.log(pokemonList);
  
  const array = pokemonList;
  
  console.log(array);


  







  return (
    <div className='main'>
      <h1>Pokemon Universe</h1>
      <Dropdown title="Filter by type" 
         options= {["fire" , "water"]}
          func={(e)=>setcategory(e.target.value)}
          category={category} />

      <Card pokemonList={pokemonList} />
      <button className='load-more-button' onClick={fetchMorePokemon}>
        Load More
      </button>
    </div>
  );
}

export default Home;
