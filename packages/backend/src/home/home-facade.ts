import {
  BehaviorSubject,
  delay,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { KEY } from '../search-results/update-history';
import { HomeState } from '../types';

let _state: HomeState = {
  history: [],
}

const store$ = new BehaviorSubject<HomeState>(_state);
const state$ = store$.asObservable();

/**
 * Sets up the query listener
 */
const init = () => {
  initializeHistory();
}

const loadHistory = (): Observable<string[]> => {
  return of(JSON.parse(window.localStorage.getItem(KEY) || '[]') as string[]);
};

const initializeHistory = () => {
  of(0)
    .pipe(
      switchMap(() => loadHistory())
    )
    .subscribe((history: string[]) => _updateState({ history }));
}

const history$ = state$.pipe(
  map((state) => state.history),
  distinctUntilChanged()
);

const _updateState = (state: HomeState) => store$.next((_state = state));

export const facade = {
  init,
  history$
}
