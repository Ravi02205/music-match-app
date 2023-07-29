
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index.js';
import Lyrics from './components/tracks/Lyrics';
import { Provider } from './context';
function App() {

  return (
    <Provider>
      <Navbar />
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lyrics/track/:id" element={<Lyrics />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
