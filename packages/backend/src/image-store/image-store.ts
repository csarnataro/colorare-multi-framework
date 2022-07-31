import { 
  BehaviorSubject, 
  combineLatest, 
  debounceTime, 
  distinctUntilChanged, 
  filter, 
  of, 
  map,
  Observable, 
  switchMap,
  tap
} from 'rxjs';
import { fetchImages } from './image-fetcher';
import { Image, ItemState } from './types';

let _state: ItemState = {
  items: [],
  query: '',
  loading: false,
  history: ['Princess', 'Unicorn'],
}

const store = new BehaviorSubject<ItemState>(_state);
const state$ = store.asObservable();

const findImages = (query: string): Observable<Image[]> => {
  if (!query || query === '') {
    return of([]);
  }
  return of([
    {
      data: 'abc',
      id:	"AF698D3DBAED98FF8DE920B7662010EC54D2A4D7",
      title:	"disegni da colorare disney frozen | Disegni a matita, Disegni da ...",
      media:	new URL("https://i.pinimg.com/originals/5d/38/6c/5d386c92407fa988f68168c02f15bdb2.jpg"),
      thumbnail: new URL("https://s1.qwant.com/thumbr/474x670/9/e/7af6b420b4f5f03366e394863bc7a2cc5a95eda9834c866d3e5bca72ffebfa/th.jpg?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.9hMmOYeZB-dtPePD1arB-wHaKe%26pid%3DApi&q=0&b=1&p=0&a=0"),
      media_preview:	new URL("https://s2.qwant.com/thumbr/0x380/7/3/2a0078909c87559dd6e7a3eca8937157ace14e53a6b647cf2e9ac2efe121c2/5d386c92407fa988f68168c02f15bdb2.jpg?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F5d%2F38%2F6c%2F5d386c92407fa988f68168c02f15bdb2.jpg&q=0&b=1&p=0&a=0"),
    },
    {
      data: 'xyz',
      id:	"EAEDD71A19A00CA153AA26ED14334CAC292F9025",
      title:	"Disegni Da Stampare E Colorare Per Bambini Frozen",
      media:	new URL("https://i0.wp.com/i.pinimg.com/originals/5d/03/45/5d0345e3cf3a07d2054c7e032c32e777.png"),
      thumbnail: new URL("https://s1.qwant.com/thumbr/474x547/0/a/6d33d26e4f4bb64f771c188ae1bb11935e7fe6227a4ee5d697e31f61fee755/th.jpg?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HxKfttTVa0BUIyexAIpx9AHaIj%26pid%3DApi&q=0&b=1&p=0&a=0"),
      media_preview:	new URL("https://s2.qwant.com/thumbr/0x380/c/4/6edcb69502334a041a6456b15301f6b3733e0504ec62eb26761701d352ff44/5d0345e3cf3a07d2054c7e032c32e777.png?u=https%3A%2F%2Fi0.wp.com%2Fi.pinimg.com%2Foriginals%2F5d%2F03%2F45%2F5d0345e3cf3a07d2054c7e032c32e777.png&q=0&b=1&p=0&a=0"),
    }
  ]);	
}

/**
 * Sets up the query listener
 */
const init = () => {
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
        loading: false
      });
    });  
}
// // const subscribe = (cb: (item: any) => void ) => subject.subscribe(cb);
// const addItem = (item: any) => {
//   updateState({
//     ..._state,
//     items: [
//       ..._state.items,
//       {
//         id: Date.now().toString(),
//         title: `Added item: '${item.title}'`,
//       }
//     ]
//   })
// }


// // TODO: refactor this function to be type safe
// const buildObservable = (state$: Observable<ItemState>, property: keyof ItemState): Observable<any> => {
//   return state$.pipe(
//     map((state) => state[property]),
//     distinctUntilChanged()
//   )
// }

// buildObservable(state$, 'currentURL');

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

const updateQuery = (query: string) => _updateState({..._state, query});

const loading$ = state$.pipe(map((state) => state.loading));
const _updateState = (state: ItemState) => store.next((_state = state));

/**
 * Viewmodel that resolves once all the data is ready (or updated)...
 */
const vm$: Observable<ItemState> = combineLatest([
  items$,
  query$,
  loading$,
  history$,
  ]).pipe(
  map(([items, query, loading, history]) => 
    ({ items, query, loading, history })
  )
);

export const facade = {
  init,
  updateQuery,
  vm$
}
