import { BehaviorSubject, Subject } from 'rxjs';

const initialState: ItemState = {
  items: [{
    id: '1',
    title: 'Chi sa',
  }],
};

const subject = new BehaviorSubject(initialState);


type ItemState = {
  items: Item[]
}

type Item = {
  id: string,
  title: string,
}

let state = initialState;

const subscribe = (cb: (item: any) => void ) => subject.subscribe(cb);
const addItem = (item: any) => {
  state = {
    ...state,
    items: [
      ...state.items,
      {
        id: Date.now().toString(),
        title: `Added: '${item.title}'`,
      }
    ]
  }
  subject.next(state);
}

export const imageStore = {
  initialState,
  subscribe,
  addItem,
}