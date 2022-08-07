/* @refresh reload */
import { ErrorBoundary, render } from 'solid-js/web';
import 'virtual:windi-devtools';
import 'windi.css';

import { Route, Router, Routes } from 'solid-app-router';
import Home from './pages/home';
import Results from './pages/results';

//Data function
// async function ImageData({ params, location, navigate, data }): Promise<Image> {
//   console.dir('******** BEGIN: index:16 ********');
//   console.dir(data, { depth: null, colors: true });
//   const image = JSON.parse(atob(location.search.d));
//   console.dir(image, { depth: null, colors: true });
//   console.dir('********   END: index:16 ********');
//   return image;
// }

render(() =>
    <ErrorBoundary fallback={err => {
      console.error(err);
      return <pre>[{JSON.stringify(err.message)}]</pre>
    }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />;
          <Route path="/search" element={<Results />} />;
          <Route path="*" element={() => <div>Page not found</div>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  , document.getElementById('root') as HTMLElement);
