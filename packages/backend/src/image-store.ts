import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, Subject } from 'rxjs';

const initialState: ItemState = {
  items: [],
  query: '',
  loading: false,
  history: ['Princess'],
}

const store = new BehaviorSubject<ItemState>(initialState);
const state$ = store.asObservable();

let _state = initialState;

type ItemState = {
  items: Item[];
  history: string[],
  query?: string;
  loading: boolean;
}

export type Item = {
  id: string;
  title: string;
}

function updateState(state: ItemState) {
  store.next((_state = state));
}

function init() {
  updateState((_state = initialState));
}


// const subscribe = (cb: (item: any) => void ) => subject.subscribe(cb);
const addItem = (item: any) => {
  updateState({
    ..._state,
    items: [
      ..._state.items,
      {
        id: Date.now().toString(),
        title: `Added item: '${item.title}'`,
      }
    ]
  })
}

const setQuery = (query: string) => {
  updateState({
    ..._state,
    query
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

const query$ = state$.pipe(
  map((state) => state.query),
  distinctUntilChanged()
);

const loading$ = state$.pipe(map((state) => state.loading));

/**
 * Viewmodel that resolves once all the data is ready (or updated)...
 */
const vm$: Observable<ItemState> = combineLatest([
  items$,
  query$,
  loading$,
  history$
  ]).pipe(
  map(([items, query, loading, history]) => {
    return { items, query, loading, history };
  })
);


export const facade = {
  init,
  addItem,
  setQuery,
  vm$
}