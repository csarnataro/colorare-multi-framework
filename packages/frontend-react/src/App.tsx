import React, { useEffect, useState } from 'react';
import './App.css';

import { facade } from '@colorare/backend';

function App() {

  const [store, setStore] = useState();

  useEffect(() => {
    facade.init()
  }, []);

  const addNewItem = () => {
    // facade.addItem({title: 'abc'});
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
