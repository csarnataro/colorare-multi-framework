/* @refresh reload */
import { ErrorBoundary, render } from 'solid-js/web';
import 'virtual:windi-devtools';
import 'windi.css';

import { Route, Router, Routes } from 'solid-app-router';
import Home from './pages/home';
import SingleResult from './pages/single-result';
import Results from './pages/results';
import * as db from './db';
import { Image } from './types/image';

//Data function
async function ImageData({ params, location, navigate, data }): Promise<Image> {
  return db.find(params.id);
}

render(() =>
    <ErrorBoundary fallback={err => {
      console.error(err);
      return <pre>[{JSON.stringify(err.message)}]</pre>
    }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />;
          <Route path="/search" element={<Results />} />;
          <Route path="/image/:id" element={<SingleResult />} data={ImageData} />;
          <Route path="*" element={() => <div>Page not found</div>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  , document.getElementById('root') as HTMLElement);
