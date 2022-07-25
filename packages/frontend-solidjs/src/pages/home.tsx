import { filter, fromEvent, map } from 'rxjs';
import { useNavigate } from 'solid-app-router';
import { Component, createSignal, onCleanup, onMount } from 'solid-js';
import Logo from '../components/logo';
import LadyBug from '../icons/lady-bug';
import Magnifier from '../icons/magnifier';
import { imageStore } from '@colorare/backend'


const Home: Component = () => {
  const [inputValue, setInputValue] = createSignal();
  const [images, setImages] = createSignal();
  const navigate = useNavigate();


  const addNewItem = () => {
    imageStore.addItem({title: 'abc'});
  }

  onMount(() => 
    imageStore.subscribe(setImages)
  );

  const search = () => {
    navigate(`/search?q=${inputValue()}`)
  }

  let inputFiedlEventListener$: any; 
  const initInputFiedlEventListener = ((inputField: any) => {
    inputFiedlEventListener$ = fromEvent(inputField, 'keyup').pipe(
      map((x: any) => x?.code),
      filter(c => c === 'Enter')
    ).subscribe(
      search
    );
  });

  onCleanup(() => {
    inputFiedlEventListener$?.unsubscribe()
  });

  return (
    <>
      <div class="container mx-auto p-6">
        <div class="flex flex-col items-center">
          <Logo additionalCssClass='mt-20 mb-20' font='6xl' />
          <div class="relative text-gray-600 focus-within:text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                <Magnifier size={6} />
              </button>
            </span>
            <input
              ref={(el) => initInputFiedlEventListener(el)}
              type="search" class="py-2 pr-2 text-xl w-96 h-12 text-gray-900 border rounded-md pl-10"
              placeholder="Cerca..." autocomplete="off"
              onInput={(e) => setInputValue(e.currentTarget.value)} />
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
        <hr />
        <pre>[{JSON.stringify(images(), null, 2)}]</pre>
        <br />
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addNewItem}>Add</button>

      </div>
    </>
  );
};

export default Home;

