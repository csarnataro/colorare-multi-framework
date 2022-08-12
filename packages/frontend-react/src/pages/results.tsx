import { Image, ResultsState, SearchResultsViewModel } from '@colorare/backend';
import { useEffect, useState, CSSProperties } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Observable, Subscription } from 'rxjs';
import Logo from '../components/logo';
import SearchBox from '../components/search-box';
import SelectedImagePanel from '../components/selected-image-panel';
// import useResultsFacade from '../hooks/useResultsFacade';

const debugStyle: CSSProperties = { 
  position: 'fixed', 
  left: 0, 
  top: 0, 
  width: 400, 
  height: 400, 
  backgroundColor: 'rgba(0, 0, 0, 0.7)' ,
  fontSize: 'smaller', 
  color: 'white',
  fontFamily: 'monospace',
}

const Results = () => {
  // const viewModel = useViewModel();
  // const {state, updateQuery, deselectImage, selectImageById } = useResultsFacade();
  // const {items, selectedImage, query, errorMessage} = state;

  const viewModel = new SearchResultsViewModel();
  // const [state, setState] = useState<ResultsState>(viewModel.initialState);
  const [inputValue, setInputValue] = useState<string>('')
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [items, setItems] = useState<Image[]>()
  const [selectedImage, setSelectedImage] = useState<Image>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [query, setQuery] = useState<string>()


  function subscribeTo<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    return source$.subscribe({ next: nextFn, error: console.error });
  }

  const updateQuery = (q: string) => viewModel.updateQuery(q)
  const deselectImage = () => viewModel.deselectImage();
  const selectImageById = (id: string) => viewModel.selectImageById(id);

  const initSubscriptions = (): Subscription[] => (
    [
      // subscribeTo(viewModel.items$, () => setState(state => ({ ...state }))),
      // subscribeTo(viewModel.errorMessage$, () => setState(state => ({ ...state }))),
      // subscribeTo(viewModel.query$, () => setState((state) => ({ ...state }))),
      // subscribeTo(viewModel.selectedImage$, () => setState((state) => ({ ...state }))),
    ])

  useEffect(() => {
    // const subs = initSubscriptions();
    viewModel.items$.subscribe((items: Image[]) => setItems(items));
    viewModel.errorMessage$.subscribe((errorMsg: string | undefined) => setErrorMessage(errorMsg));
    viewModel.query$.subscribe((query: string | undefined) => setQuery(query));
    viewModel.selectedImage$.subscribe((image) => setSelectedImage(image));

    // return () => { subs.forEach(it => it.unsubscribe()) };
  }, []);



  const search = (q: string) => {
    if (q) {
      console.dir('******** BEGIN: results:20 ********');
      console.dir(q, { depth: null, colors: true });
      console.dir('********   END: results:20 ********');
      // setInputValue(q);
      updateQuery(q);
      navigate(`/search?q=${q}`)
    }
  }

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q !== "") {
      setInputValue(q);
      updateQuery(q);
    }
  }, [])

  return (
    <>
      <pre style={debugStyle}>{JSON.stringify({query, items: items?.length}, null, 2)}</pre>
      <div className="container mx-auto p-6 pb-0">
        <div className="flex flex-row items-center mb-8">
          <Link to="/">
            <Logo size={4} font="3xl" additionalCssClass='mr-4' />
          </Link>
          <SearchBox search={search} setInputValue={setInputValue} value={inputValue} />
        </div>
      </div>
      <div className="text-gray-5 00 container mx-auto py-2 px-6 border-t">Hai cercato: <i>{query}</i></div>
      <div className="container mx-auto p-6">
        {errorMessage
          ? <div>Oops! {errorMessage}</div>
          : (
            <div className="flex">
              <div className="flex flex-wrap w-full min-h-full my-0 mx-auto justify-between">
                {items?.map((res) =>
                  <div key={res.id} onClick={() => selectImageById(res.id)}>
                    <div className="m-1 bg-gray-100 px-2 py-2 hover:shadow-gray-500/75 shadow-gray-500/50 shadow-sm hover:shadow-md">
                      <img className="max-w-full h-48 object-cover my-0 mx-auto" src={`${res.thumbnail}`} />
                      <div className="text-xs truncate max-w-32" >{`${res.width}x${res.height}`}</div>
                    </div>
                  </div>
                )}
              </div>
              {selectedImage &&
                <SelectedImagePanel image={selectedImage} deselectImage={deselectImage} />
              }
            </div>
          )
        }
      </div>
    </>
  );
};

export default Results;
