import React from 'react';
import { useState, useEffect } from 'react';
import { getPotter } from './services/fetch-utils';

export default function PotterSearch() {
  const [potters, setPotters] = useState([]);
  const [potterQuery, setPotterQuery] = useState([]);

  async function fetchPotter() {
    const data = await getPotter(potterQuery);
   
    setPotters(data);
  }

  useEffect(() => {
    fetchPotter();
  }, []); //eslint-disable-line

  async function handlePotterSubmit(e) {
    e.preventDefault();

    await fetchPotter();

    setPotterQuery('');
  }

  return (
    <div className="potter-search">
      <form onSubmit={handlePotterSubmit}>
        <input onChange={e => setPotterQuery(e.target.value)} />
        <button>Search</button>
      </form>
      {
        potters.map((potter, i) => <div className="potter" key={potter.name + i} >
          <p>{potter.name}</p>
          <img src={potter.image} />
        </div>)
      }
    </div>
    
  );
}
