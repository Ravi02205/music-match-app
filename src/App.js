
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index.js';
import Lyrics from './components/tracks/Lyrics';
import { Provider } from './context';
function App() {

  let routes = createBrowserRouter([
    {
      path: '/',
      element: <Index />
    },
    {
      path: '/lyrics/track/:id',
      element: <Lyrics />
    }
  ]);

  return (
    <Provider>
      <Navbar />
      <div className="container">
        <RouterProvider router={routes} />
      </div>
    </Provider>
  );
}

export default App;
