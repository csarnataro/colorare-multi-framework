import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';

import 'virtual:windi.css';

import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import Results from './pages/results';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Results />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
