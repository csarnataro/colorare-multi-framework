import { Component, createEffect, createSignal, For, onCleanup, onMount } from 'solid-js';
import Logo from '../components/logo';
import Magnifier from '../icons/magnifier';
import { Link, useNavigate, useSearchParams } from 'solid-app-router';
import { facade, ItemState, Image } from '@colorare/backend'
import { filter, fromEvent, map } from 'rxjs';
import SearchBox from '../components/search-box';

const App: Component = () => {
  const [inputValue, setInputValue] = createSignal<string>('');
  const [vm, setVm] = createSignal<ItemState>()
  const navigate = useNavigate();

  // const [query, setQuery] = createSignal();
  const [images, setImages] = createSignal<Image[]>();
  const [searchParams] = useSearchParams();


  onMount(() => {
    facade.init();
    facade.vm$.subscribe((vm: ItemState) => setVm(vm));
    const query = searchParams.q;
    if (query && query !== "") {
      setInputValue(query);
      facade.updateQuery(query);
    }
  });

  // const [images, setImages] = createStore([]);
  // const [result] = createResource(searchParams.q, cache(fetchImages));

  const search = () => {
    const query = inputValue();
    if (query) {
      facade.updateQuery(query);
      navigate(`/search?q=${query}`)
    }
  }

  // createEffect(() => {
  //   const items = result() as Image[];
  //   setImages(items);
  // })

  return (
    <>
      <div class="container mx-auto p-6 pb-0">
        <div class="flex flex-row items-center mb-8">
          <Link href="/">
            <Logo size={4} font="3xl" additionalCssClass='mr-4' />
          </Link>
          <SearchBox search={search} setInputValue={setInputValue} value={vm()?.query} />
        </div>
      </div>
      <div class="text-gray-5 00 container mx-auto py-2 px-6 border-t">Hai cercato: <i>{vm()?.query}</i></div>
      <div class="container mx-auto p-6 grid grid-cols-4 gap-4">
        <For each={vm()?.items}>{(res) =>
          <Link href={`/image?d=${res.data}`}>
            <div class="col-span-1 flex flex-col bg-white border-2 p-4">
              <img class="object-cover" src={`${res.thumbnail}`} />
            </div>
          </Link>
        }
        </For>
      </div>
      <pre>{JSON.stringify(vm(), null, 2)}</pre>

    </>
  );
};

export default App;
