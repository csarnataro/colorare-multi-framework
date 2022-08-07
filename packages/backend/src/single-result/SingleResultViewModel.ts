import {
  BehaviorSubject, 
  distinctUntilChanged,
  filter,
  map,
  Observable,
} from 'rxjs';
import { Image, SingleResultState } from '../types';
import Base64 from '../utils/base64';

class SingleResultViewModel {

  private initialState: Partial<SingleResultState> = {
    selectedImage: undefined,
    selectedImageId: undefined,
  };

  private state: SingleResultState = {...this.initialState}; 
  private store = new BehaviorSubject<SingleResultState>(this.state);
  private state$ = this.store.asObservable();

  selectedImage$: Observable<Image> = this.state$.pipe(
    map((state) => state.selectedImage!),
    filter(i => !!i),
    distinctUntilChanged()
  );

  selectedImageId$: Observable<string> = this.state$.pipe(
    map((state) => state.selectedImageId!),
    filter(i => !!i),
    distinctUntilChanged(),
  );

  constructor() {
    this.updateState({...this.initialState});
    this.initializeSelectedImageIdStream();
  }
  
  private updateState(state: SingleResultState) {
    this.store.next(this.state = state);
  }

  private initializeSelectedImageIdStream() {
    this.selectedImageId$.pipe(
      filter(id => !!id),
      map((id) => getImage(id!)),
      filter(image => !!image),
    ).subscribe((img: Image | undefined) => {
      if (img) {
        this.updateState({
          ...this.state,
          selectedImage: img
        })
      }
    });
  }

  updateSelectedImageId(id: string) {
    this.updateState({ ...this.state, selectedImageId: id });
  }
}

// let _state: SingleResultState = { ..._initialState };

// const store = new BehaviorSubject<SingleResultState>(_state);
// const state$ = store.asObservable();

const getImage = (id: string): Image | undefined => {
  if (!id) return;
  return JSON.parse(Base64.decode(id)) as Image;
}

export default SingleResultViewModel;
