import React, { useEffect, useRef, useState } from 'react';
import { filter, fromEvent, map, tap } from "rxjs";
import Magnifier from "../icons/magnifier";

type SearchBoxProps = {
  search: any;
  setInputValue: any;
  home?: boolean;
  value?: string; // aka inputValue
};

const SearchBox = (props: SearchBoxProps) => {

  // const [input, setInput] = useState<string>('');
  const {search, home, setInputValue, value} = props;
  const inputRef = useRef<HTMLInputElement>(null);

  let inputFiedlEventListener$: any;
  const initInputFieldEventListener = ((inputField: any) => {
    inputFiedlEventListener$ = fromEvent(inputField, 'keyup').pipe(
      map((x: any) => x?.code),
      filter(c => c === 'Enter'),
    ).subscribe(
      () => search(inputRef.current?.value)
    );
  });


  useEffect(() => {
    initInputFieldEventListener(inputRef.current);
    return () => inputFiedlEventListener$?.unsubscribe();
  }, []);


  // useEffect(() => {
  //   if (value) {
  //     setInputValue(value);
  //   }
  // }, [value]);

  return (
    home ?
      <>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Cerca
        </label>

        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
            <Magnifier size={6} />
          </button>
        </span>
        <input
          id="default-search"
          type="search"
          ref={inputRef}
          className="py-2 pr-2 text-xl w-96 h-12 text-gray-900 border rounded-md pl-10"
          placeholder="Cerca..."
          autoComplete="off"
          onInput={(e) => setInputValue(e.currentTarget.value)}
          value={value}
        />
      </>
      :
      <>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Cerca</label>

        <div className="flex items-center justify-center">
          <div className="flex border rounded-md">
            <input
              className="px-3 py-2 w-80 text-xl text-gray-900 border rounded-md border-white"
              id='default-search'
              ref={inputRef}
              type="text" 
              placeholder="Cerca..."
              autoComplete="off"
              onInput={(e) => setInputValue(e.currentTarget.value)}
              value={value}
            />
            <button 
                className="flex items-center justify-center px-4 border-l" 
                onClick={() => search(inputRef.current?.value)}
            >
              <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
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
