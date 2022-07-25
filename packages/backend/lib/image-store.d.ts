declare type ItemState = {
    items: Item[];
};
declare type Item = {
    id: string;
    title: string;
};
export declare const imageStore: {
    initialState: ItemState;
    subscribe: (cb: (item: any) => void) => import("rxjs").Subscription;
    addItem: (item: any) => void;
};
export {};
