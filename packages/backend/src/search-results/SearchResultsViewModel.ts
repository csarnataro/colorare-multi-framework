import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { Image, ResultsState } from '../types';
import { fetchImages } from './image-fetcher';
import { updateHistory } from './update-history';


class SearchResultsViewModel {
  initialState: ResultsState = {
    items: [],
    query: '',
    loading: false,
    history: [],
  };

  private state: ResultsState = { ...this.initialState };
  private store = new BehaviorSubject<ResultsState>(this.state);
  private state$ = this.store.asObservable();

  items$ = this.state$.pipe(
    map((state) => state.items),
    distinctUntilChanged()
  );
  
  history$ = this.state$.pipe(
    map((state) => state.history),
    distinctUntilChanged()
  );
  
  errorMessage$ = this.state$.pipe(
    map((state) => state.errorMessage),
    distinctUntilChanged()
  );
  
  query$: Observable<string> = this.state$.pipe(
    tap(q => {
      console.dir('******** BEGIN: SearchResultsViewModel:45 ********');
      console.dir(q, { depth: null, colors: true });
      console.dir('********   END: SearchResultsViewModel:45 ********');
    }),
    map((state) => state.query),
    distinctUntilChanged()
  );

  selectedImage$: Observable<Image> = this.state$.pipe(
    map((state) => state.selectedImage!),
    distinctUntilChanged()
  );

  selectedImageId$: Observable<string> = this.state$.pipe(
    map((state) => state.selectedImageId!),
    distinctUntilChanged(),
  );
  
  constructor() {
    this.initializeResultsStream();
    this.initializeQueryStream();
  }

  private initializeQueryStream() {
    this.query$
      .pipe(
        distinctUntilChanged(),
        switchMap((query: string) => fetchImages(query!))
      )
      .subscribe((items: Image[]) => {
        this.updateState({
          ...this.state,
          items,
          loading: false,
          errorMessage: (items && items.length > 0) ? undefined : 'No result found',
        });
      });
  }

  private initializeResultsStream() {
    this.query$.pipe(
      filter((query) => !!query),
      distinctUntilChanged(),
    ).subscribe((query: string) => updateHistory(query!))
  
  }

  deselectImage() {
    this.updateState({...this.state, selectedImage: undefined })
  } 


  selectImageById(imageId: string) {
    const selectedImage = this.state.items.find(image => image.id === imageId);
    if (selectedImage) {
      this.updateState({...this.state, selectedImage })
    }
  } 

  updateQuery(query: string) {
    this.updateState({ ...this.state, query, items: [], selectedImage: undefined });
  }
  
  private updateState(state: ResultsState) { 
    this.store.next(this.state = state);
  }

}

export default SearchResultsViewModel;
