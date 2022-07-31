import { facade, ItemState } from '@colorare/backend';
import { filter, fromEvent, map } from 'rxjs';
import { useNavigate } from 'solid-app-router';
import { Component, createEffect, createSignal, For, onCleanup, onMount } from 'solid-js';
import Logo from '../components/logo';
import SearchBox from '../components/search-box';
import LadyBug from '../icons/lady-bug';
import Magnifier from '../icons/magnifier';

const Home: Component = () => {
  const [inputValue, setInputValue] = createSignal<string>('');
  const [vm, setVm] = createSignal<ItemState>()
  const navigate = useNavigate();

  onMount(() => {
    facade.init();
    facade.vm$.subscribe((vm: ItemState) => setVm(vm));
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
        <For each={vm()?.history}>{(entry: string) =>
        <li>
          <a target="_blank" href={`/search?q=${entry}`}>
            {entry}
          </a>
        </li>
      }</For>
      </div>
      <pre>{JSON.stringify(vm(), null, 2)}</pre>
    </>
  );
};

export default Home;

