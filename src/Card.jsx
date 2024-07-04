import React from 'react';

function Card({ pokemonList }) {
  return (
    <div className='pokemon-container'>
      {pokemonList.map((pokemon) => (
        <div className='pokemon-card' key={pokemon.id}>
          <div className='pokemon-card-inner'>
            <div className='pokemon-card-front'>
              <img
                className='pokemon-image'
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
               
              />
              
              <h1 className='pokemon-name'>{pokemon.name}</h1>
              <p className='pokemon-id'>
               <strong> Type:</strong>  {pokemon.types[0].type.name}
              </p>
            </div>
            <div className='pokemon-card-back'>
              <h1 className='pokemon-name'>{pokemon.name}</h1>
              <p>Height: {pokemon.height / 10} m</p>
              <p>Weight: {pokemon.weight / 10} kg</p>
              <p>hp: {pokemon.stats[0].base_stat} </p>
              {/* <p>Attack: {pokemon.stats[1].base_stat} </p> */}
              <p>Attack: {pokemon.moves[0].move.name} </p>
              <p>Deffence: {pokemon.stats[2].base_stat} </p>
              <p>Special Attack: {pokemon.stats[3].base_stat} </p>
              <p>Speacial Deffence: {pokemon.stats[4].base_stat} </p>
              <p>Speed: {pokemon.stats[5].base_stat} </p>
              
             
          
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
