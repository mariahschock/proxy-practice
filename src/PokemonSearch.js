import React from 'react';
import { useState, useEffect } from 'react';
import { getPokemon } from './services/fetch-utils';

export default function PokemonSearch() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonQuery, setPokemonQuery] = useState([]);

  async function fetchAndStorePokemon() {
    const data = await getPokemon(pokemonQuery);

    setPokemon(data.results);
  }

  useEffect(() => {
    fetchAndStorePokemon();
  }, []); //eslint-disable-line

  async function handleSubmit(e) {
    e.preventDefault();

    await fetchAndStorePokemon();

    setPokemonQuery('');
  }


  return (
    <div className="pokemon-list">
      <form onSubmit={handleSubmit}>
        <input onChange={e => setPokemonQuery(e.target.value)}/>
        <button>Search</button>
      </form>
      {
        pokemon.map((poke, i) => <div className="pokemon" key={poke.pokemon + i} >
          <p>{poke.pokemon}</p>
          <img src={poke.url_image}/>
        </div>)
      }
    </div>
  );
}
