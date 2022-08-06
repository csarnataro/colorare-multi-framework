import {
  BehaviorSubject, 
  distinctUntilChanged,
  filter,
  map,
  Observable,
} from 'rxjs';
import { Image, SingleResultFacade, SingleResultState } from '../types';
import Base64 from '../utils/base64';

let _initialState: Partial<SingleResultState> = {
  selectedImage: undefined,
  selectedImageId: undefined,
};

let _state: SingleResultState = { ..._initialState };

const store = new BehaviorSubject<SingleResultState>(_state);
const state$ = store.asObservable();

const getImage = (id: string): Image | undefined => {
  if (!id) return;
  return JSON.parse(Base64.decode(id)) as Image;
}

/**
 * Sets up the query listener
 */
const init = () => {
  _updateState({..._initialState});
  initializeSelectedImageIdStream();

}

const initializeSelectedImageIdStream = () => {
  selectedImageId$.pipe(
    filter(id => !!id),
    map((id) => getImage(id!)),
    filter(image => !!image),
  ).subscribe((img: Image | undefined) => {
    if (img) {
      _updateState({
        ..._state,
        selectedImage: img
      })
    }
  });
}

const selectedImage$: Observable<Image> = state$.pipe(
  map((state) => state.selectedImage!),
  filter(i => !!i),
  distinctUntilChanged()
);

const selectedImageId$: Observable<string> = state$.pipe(
  map((state) => state.selectedImageId!),
  filter(i => !!i),
  distinctUntilChanged(),
);

const updateSelectedImageId = (id: string) => _updateState({ ..._state, selectedImageId: id });

const _updateState = (state: SingleResultState) => store.next((_state = state));

export const facade: SingleResultFacade = {
  init,
  updateSelectedImageId,
  selectedImage$,
  selectedImageId$,
}
