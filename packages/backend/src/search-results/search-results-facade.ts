import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs';
import { Image, ResultsFacade, ResultsState } from '../types';
import { fetchImages } from './image-fetcher';
import { updateHistory } from './update-history';

let _initialState: ResultsState = {
  items: [],
  query: '',
  loading: false,
  history: [],
};

let _state: ResultsState = { ..._initialState };

const store = new BehaviorSubject<ResultsState>(_state);
const state$ = store.asObservable();

/**
 * Sets up the query listener
 */
const init = () => {
  _updateState({..._initialState});
  initializeQueryStream();
  initializeResultsStream();
}

const initializeResultsStream = () => {
  query$.pipe(
    filter((query) => !!query),
    distinctUntilChanged(),
  ).subscribe((query) => updateHistory(query!))

}

const initializeQueryStream = () => {
  query$
    .pipe(
      debounceTime(0), // ??? like next tick?
      distinctUntilChanged(),
      switchMap((query) => fetchImages(query!))
    )
    .subscribe((items: Image[]) => {
      _updateState({
        ..._state,
        items,
        loading: false,
        errorMessage: (items && items.length > 0) ? undefined : 'No result found',
      });
    });
}

const items$ = state$.pipe(
  map((state) => state.items),
  distinctUntilChanged()
);

const history$ = state$.pipe(
  map((state) => state.history),
  distinctUntilChanged()
);

const errorMessage$ = state$.pipe(
  map((state) => state.errorMessage),
  distinctUntilChanged()
);

const query$ = state$.pipe(
  map((state) => state.query),
  distinctUntilChanged()
);

const updateQuery = (query: string) => _updateState({ ..._state, query });

const _updateState = (state: ResultsState) => store.next((_state = state));

export const facade: ResultsFacade = {
  init,
  updateQuery,
  items$,
  query$,
  history$,
  errorMessage$
}
