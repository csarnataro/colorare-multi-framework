import React, { useEffect, useState } from 'react';
import './App.css';

import { imageStore } from '@colorare/backend';

function App() {

  const [store, setStore] = useState(imageStore.initialState);

  useEffect(() => {
    imageStore.subscribe(setStore)
  }, []);

  const addNewItem = () => {
    imageStore.addItem({title: 'abc'});
  }

  return (
    <div className="App">
      {JSON.stringify(store, null, 2)}

      <input type="text" />
      <button type="submit" onClick={addNewItem}>Add</button>
    </div>
  );
}

export default App;
