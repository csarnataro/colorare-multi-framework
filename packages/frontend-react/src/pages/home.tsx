import React, { useEffect, useState } from 'react';

import Logo from '../components/logo';
import SearchBox from '../components/search-box';
import Magnifier from '../icons/magnifier';
import LadyBug from '../icons/lady-bug';
import { useNavigate } from 'react-router-dom';
import useResultsFacade from '../hooks/useResultsFacade';

function Home() {
  const navigate = useNavigate();

  const {state: { history, query }, updateQuery } = useResultsFacade();


  // const [inputValue, setInputValue] = useState<string>('');
  // const [history, setHistory] = useState<string[]>(['ABC'])

  const search = (q: string) => {
    if (q) {
      navigate(`/search?q=${q}`)
    }
  }

  return (<>
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        <Logo additionalCssClass='mt-20 mb-20' font='6xl' />
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <SearchBox search={search} setInputValue={updateQuery} home />
        </div>
        <div className="flex flex-row mt-4">
          <button className="hover:bg-pink-100 hover:border-red-200 bg-gray-100 py-2 px-6 mr-4 border-1 rounded" onClick={() => search(query)}>
            <Magnifier additionalCssClass="-mt-1 mr-2" />
            Cerca</button>
          <button className="hover:bg-pink-100 hover:border-red-200 bg-gray-100 py-2 px-6 border-1 rounded">
            <LadyBug additionalCssClass="mr-2" />
            Mi sento fortunato
          </button>
        </div>
      </div>
      <hr /><br />
      <ul>
        {history?.map((entry: string) => (
          <li key={entry}>
            <a href={`/search?q=${entry}`}>
              {entry}
            </a>
          </li>)
        )}
      </ul>

    </div>
  </>)
}

export default Home;