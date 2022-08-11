import { filter, fromEvent, map } from "rxjs";
import { Component, onCleanup } from "solid-js";
import Magnifier from "../icons/magnifier";

type SearchBoxProps = {
  search: any;
  setInputValue: any;
  home?: boolean;
  value?: string
};

const SearchBox: Component<SearchBoxProps> = (props: SearchBoxProps) => {
  // NOTE: solidjs props cannot be destructured as usually done in react
  let inputFiedlEventListener$: any;
  const initInputFiedlEventListener = ((inputField: any) => {
    inputFiedlEventListener$ = fromEvent(inputField, 'keyup').pipe(
      map((x: any) => x?.code),
      filter(c => c === 'Enter')
    ).subscribe(
      props.search
    );
  });

  onCleanup(() => {
    inputFiedlEventListener$?.unsubscribe()
  });

  return (
    props.home ?
      <>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Cerca
        </label>

        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
            <Magnifier size={6} />
          </button>
        </span>
        <input
          id='default-search'
          ref={(el) => initInputFiedlEventListener(el)}
          type="search"
          class="py-2 pr-2 text-xl w-96 h-12 text-gray-900 border rounded-md pl-10"
          placeholder="Cerca..."
          autocomplete="off"
          onInput={(e) => props.setInputValue(e.currentTarget.value)}
        />
      </>
      :
      <>
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Cerca</label>

        <div class="flex items-center justify-center">
          <div class="flex border rounded-md">
            <input
              class="px-3 py-2 w-80 text-xl text-gray-900 border rounded-md border-white"
              id='default-search'
              ref={(el) => initInputFiedlEventListener(el)}
              type="text" 
              placeholder="Cerca..."
              autocomplete="off"
              onInput={(e) => props.setInputValue(e.currentTarget.value)}
              value={props.value}
            />
            <button class="flex items-center justify-center px-4 border-l" onClick={props.search}>
              <svg class="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
            </button>
          </div>
        </div>
      </>
  )
}

export default SearchBox;
