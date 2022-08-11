import { Image, ResultsFacade, ResultsState, SearchResultsViewModel } from '@colorare/backend';
import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';

export default function useResultsFacade(): ResultsFacade {
  const viewModel = new SearchResultsViewModel();
  const [state, setState] = useState<ResultsState>(viewModel.initialState);

  function subscribeTo<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
    return source$.subscribe({ next: nextFn, error: console.error });
  }

  const updateQuery = (q: string) => viewModel.updateQuery(q)
  const deselectImage = () => viewModel.deselectImage();
  const selectImageById = (id: string) => viewModel.selectImageById(id);

  const initSubscriptions = (): Subscription[] => (
    [
      subscribeTo(viewModel.items$, (items: Image[]) => setState(state => ({ ...state, items }))),
      subscribeTo(viewModel.errorMessage$, (errorMessage: string | undefined) => setState(state => ({ ...state, errorMessage }))),
      subscribeTo(viewModel.query$, (query: string) => setState((state) => ({ ...state, query }))),
      subscribeTo(viewModel.selectedImage$, (selectedImage) => setState((state) => ({ ...state, selectedImage }))),
    ])

  useEffect(() => {
    const subs = initSubscriptions();
    return () => { subs.forEach(it => it.unsubscribe()) };
  }, []);

  return {
    state,
    updateQuery,
    deselectImage,
    selectImageById,
  }
}
