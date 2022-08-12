import {
  BehaviorSubject,
  combineLatest,
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
    map((state) => state.query),
    distinctUntilChanged(),
    tap(q => {
      console.log('******** BEGIN: SearchResultsViewModel:45 ********');
      console.log(q);
      console.log('********   END: SearchResultsViewModel:45 ********');
    }),
  );

  selectedImage$: Observable<Image> = this.state$.pipe(
    map((state) => state.selectedImage!),
    distinctUntilChanged()
  );

  selectedImageId$: Observable<string> = this.state$.pipe(
    map((state) => state.selectedImageId!),
    distinctUntilChanged(),
  );
  
  data$: Observable<any> = combineLatest([
    this.history$,
    this.items$,
    this.query$,
  ]
  ).pipe(
    map(([history, items, query]) => {
      return { query, items: items.length, history };
    })
  );  


  constructor() {
    this.initializeResultsStream();
    this.initializeQueryStream();
  }

  private initializeQueryStream() {
    this.query$
      .pipe(
        distinctUntilChanged(),
        switchMap((query: string) => fetchImages(query!)),
        tap(i => {
          console.dir(i);
        })
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
    ).subscribe((query: string) => {
      const updatedHistory = updateHistory(query!);
      if (updatedHistory) {
        this.updateState({
          ...this.state,
          history: updatedHistory
        });
      }
    });
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
    console.log(`**** updating query ${query}`);
    this.updateState({ ...this.state, query });
  }
  
  private updateState(state: ResultsState) { 
    this.store.next(this.state = state);
  }

}

export default SearchResultsViewModel;
