import { BehaviorSubject } from 'rxjs';
const initialState = {
    items: [{
            id: '1',
            title: 'Chi sa',
        }],
};
const subject = new BehaviorSubject(initialState);
let state = initialState;
const subscribe = (cb) => subject.subscribe(cb);
const addItem = (item) => {
    console.dir('******** BEGIN: image-store:22 ********');
    console.dir(item, { depth: null, colors: true });
    console.dir('********   END: image-store:22 ********');
    state = {
        ...state,
        items: [
            ...state.items,
            {
                id: Date.now().toString(),
                title: item.title,
            }
        ]
    };
    subject.next(state);
};
export const imageStore = {
    initialState,
    subscribe,
    addItem,
};
//# sourceMappingURL=image-store.js.map