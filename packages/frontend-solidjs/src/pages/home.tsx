import { homeFacade } from '@colorare/backend';
import { useNavigate } from 'solid-app-router';
import { Component, createEffect, createSignal, For, onCleanup, onMount } from 'solid-js';
import Logo from '../components/logo';
import SearchBox from '../components/search-box';
import LadyBug from '../icons/lady-bug';
import Magnifier from '../icons/magnifier';

const Home: Component = () => {
  const [inputValue, setInputValue] = createSignal<string>('');
  const [history, setHistory] = createSignal<string[]>()
  const navigate = useNavigate();

  onMount(() => {
    homeFacade.init();
    homeFacade.history$.subscribe((history: string[]) => setHistory(history));
  });

  const search = () => {
    const query = inputValue();
    if (query) {
      // facade.updateQuery(query);
      navigate(`/search?q=${inputValue()}`)
    }
  }

  return (
    <>
      <div class="container mx-auto p-6">
        <div class="flex flex-col items-center">
          <Logo additionalCssClass='mt-20 mb-20' font='6xl' />
          <div class="relative text-gray-600 focus-within:text-gray-400">
            <SearchBox search={search} setInputValue={setInputValue} home />
          </div>
          <div class="flex flex-row mt-4">
            <button role="button" class="hover:bg-pink-100 hover:border-red-200 bg-gray-100 py-2 px-6 mr-4 border-1 rounded" onClick={search}>
              <Magnifier additionalCssClass="-mt-1 mr-2" />
              Cerca</button>
            <button role="button" class="hover:bg-pink-100 hover:border-red-200 bg-gray-100 py-2 px-6 border-1 rounded">
              <LadyBug additionalCssClass="mr-2" />
              Mi sento fortunato
            </button>
          </div>
        </div>
        <hr /><br />
        <For each={history()}>{(entry: string) =>
        <li>
          <a href={`/search?q=${entry}`}>
            {entry}
          </a>
        </li>
      }</For>
      </div>
    </>
  );
};

export default Home;

