import { Image, SearchResultsViewModel } from '@colorare/backend';
import { Link, useNavigate, useSearchParams } from 'solid-app-router';
import { Component, createSignal, For, onMount, Show } from 'solid-js';
import Logo from '../components/logo';
import SearchBox from '../components/search-box';
import SelectedImagePanel from '../components/selected-image-panel';

function useViewModel() {
  const viewModel = new SearchResultsViewModel();
  const [vm] = createSignal<SearchResultsViewModel>(viewModel);

  return vm();
}

const App: Component = () => {
  const viewModel = useViewModel();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = createSignal<string>('');
  const [items, setItems] = createSignal<Image[]>()
  const [selectedImage, setSelectedImage] = createSignal<Image>()
  const [errorMessage, setErrorMessage] = createSignal<string>()
  const [query, setQuery] = createSignal<string>()

  const mapStreamsToSignals = () => {
    viewModel.items$.subscribe((items: Image[]) => setItems(items));
    viewModel.errorMessage$.subscribe((errorMsg: string | undefined) => setErrorMessage(errorMsg));
    viewModel.query$.subscribe((query: string | undefined) => setQuery(query));
    viewModel.selectedImage$.subscribe((image) => setSelectedImage(image));
  }

  onMount(() => {
    mapStreamsToSignals();

    const query = searchParams.q;
    if (query && query !== "") {
      setInputValue(query);
      viewModel.updateQuery(query);
    }
  });

  // const [images, setImages] = createStore([]);
  // const [result] = createResource(searchParams.q, cache(fetchImages));

  const search = () => {
    const query = inputValue();
    if (query) {
      viewModel.updateQuery(query);
      navigate(`/search?q=${query}`)
    }
  }

  const selectImage = (imageId: string) => () => viewModel.selectImageById(imageId);

  const deselectImage = () => viewModel.deselectImage();
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
      <div class="container mx-auto p-6">
        <Show
          when={(!errorMessage())}
          fallback={<div>Oops! {errorMessage()}</div>}
        >
          <div class="flex">
            <div class="flex flex-wrap w-full min-h-full my-0 mx-auto justify-between">
              <For each={items()}>{(res) =>
                <div onClick={selectImage(res.id)}>
                  <div class="m-1 bg-gray-100 px-2 py-2 hover:shadow-gray-500/75 shadow-gray-500/50 shadow-sm hover:shadow-md">
                    <img class="max-w-full h-48 object-cover my-0 mx-auto" src={`${res.thumbnail}`} />
                    <div class="text-xs truncate max-w-32" >{`${res.width}x${res.height}`}</div>
                  </div>
                </div>
              }
              </For>
            </div>
            <Show when={selectedImage()}>
              <SelectedImagePanel image={selectedImage()} deselectImage={deselectImage} />
            </Show>
          </div>
        </Show>
      </div>

    </>
  );
};

export default App;
