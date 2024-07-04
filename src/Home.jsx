import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from './Card';
import './App.css'
import Dropdown from './Dropdown';
// import ""


function Home() {
  const[category , setcategory] = useState("all")
  const [pokemonList, setPokemonList] = useState([]);
  const [query, setQuery] = useState("");
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
        setPokemonList([...pokemonList, ...pokemonData]); 
        
      
        setLoading(false);

      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      }
    };

  fetchData();
  }, [offset]); 

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (category === "all") {
      setOffset(0);
    }
  }, [category]);

  const fetchMorePokemon = () => {
    setOffset(prevOffset => prevOffset + 20); 
  };


  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setcategory(selectedCategory);
    // Optionally, you can filter here based on selectedCategory if needed immediately
    // For now, let's filter in the Card component
  };

  
 
  


  return (
    <div className='main'>
      <div className='main_img'><img src="/src/img/download.png" alt="" />
      </div>
      {/* <h1>Pokemon universe</h1> */}
      <div>
      <div className='filter_type'>
      <Dropdown title="Filter by type" 
         options= {["all","fire" , "water", "normal" ,"ice","ground","flying","grass","rock","dragon","ghost","bug"]}
          func={handleCategoryChange}
          category={category} />
          
    <input
          onChange={handleInputChange}
          value={query}
          className='input_type'
          type="text"
          placeholder='Search Pokémon by name'
        />
   
      </div>
</div>
      <Card pokemonList={pokemonList}  category={category}  query={query}    />
      <button className='load-more-button' onClick={fetchMorePokemon}>
        Load More
      </button>
    </div>
  );
}

export default Home;
