import { Component, createEffect, createResource, createSignal, For } from 'solid-js';
import { createStore } from "solid-js/store";
// import { debounce } from "@solid-primitives/scheduled";
import { Image } from '../types/image';
import { fetchImages } from '../image-fetcher';
import LadyBug from '../icons/lady-bug';
import Logo from '../components/logo';
import Magnifier from '../icons/magnifier';
import { useImages } from '../context/ImagesContext';
import { Link, useSearchParams } from 'solid-app-router';
import { cache } from '../db';

const App: Component = () => {
  const [inputValue, setInputValue] = createSignal();
  // const [query, setQuery] = createSignal();
  const [images, setImages] = createSignal<Image[]>();
  const [searchParams] = useSearchParams();

  // const [images, setImages] = createStore([]);
  const [result] = createResource(searchParams.q, cache(fetchImages));

  const search = () => {
    // setQuery(inputValue());
  }

  createEffect(() => {
    const items = result() as Image[];
    setImages(items);
  })

  return (
    <>
      <div class="container mx-auto p-6">
        <div class="flex flex-row items-center">
          <Logo size={4} font="3xl"/>
          <div class="relative text-gray-600 focus-within:text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                <Magnifier size={6} />
              </button>
            </span>
            <input type="search" class="py-2 pr-2 text-xl w-96 h-12 text-gray-900 border rounded-md pl-10" placeholder="Cerca..." autocomplete="off"
              onInput={(e) => setInputValue(e.currentTarget.value)} />
          </div>
        </div>
      </div>
      <div class="container mx-auto p-6 grid grid-cols-4 gap-4">
        <For each={images()}>{(res) =>
          <Link href={`/image/${res._id}`}>
            <div class="col-span-1 flex flex-col bg-white border-2 p-4">
              <img class="object-cover" src={res.thumbnail} />
            </div>
          </Link>
        }
        </For>
      </div>
    </>
  );
};

export default App;
