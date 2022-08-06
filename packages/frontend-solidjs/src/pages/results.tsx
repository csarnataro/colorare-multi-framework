import { Component, createEffect, createSignal, For, onCleanup, onMount, Show } from 'solid-js';
import Logo from '../components/logo';
import Magnifier from '../icons/magnifier';
import { Link, useNavigate, useSearchParams } from 'solid-app-router';
import { resultFacade as facade, ItemState, Image, ResultFacade } from '@colorare/backend'
import { filter, fromEvent, map } from 'rxjs';
import SearchBox from '../components/search-box';

const App: Component = () => {
  const [inputValue, setInputValue] = createSignal<string>('');
  // const [vm, setVm] = createSignal<ItemState>()
  const [items, setItems] = createSignal<Image[]>()
  const [errorMessage, setErrorMessage] = createSignal<string>()
  const [query, setQuery] = createSignal<string>()
  const navigate = useNavigate();

  // const [query, setQuery] = createSignal();
  const [searchParams] = useSearchParams();

  const mapStreamsToSignals = (facade: ResultFacade) => {
    facade.items$.subscribe((items: Image[]) => setItems(items));
    facade.errorMessage$.subscribe((errorMsg: string | undefined) => setErrorMessage(errorMsg));
    facade.query$.subscribe((query: string | undefined) => setQuery(query));
  
  } 

  onMount(() => {
    facade.init();
    mapStreamsToSignals(facade);

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
          <SearchBox search={search} setInputValue={setInputValue} value={query()} />
        </div>
      </div>
      <div class="text-gray-5 00 container mx-auto py-2 px-6 border-t">Hai cercato: <i>{query()}</i></div>
      <div class="container mx-auto p-6 grid grid-cols-4 gap-4">
      <Show
        when={(!errorMessage())}
        fallback={<div>{errorMessage()}</div>}
      >
        <For each={items()}>{(res) =>
          <Link href={`/image?d=${res.id}`}>
            <div class="col-span-1 flex flex-col bg-white border-2 p-4">
              <img class="object-cover" src={`${res.thumbnail}`} />
            </div>
          </Link>
        }
        </For>
        </Show>
      </div>

    </>
  );
};

export default App;
