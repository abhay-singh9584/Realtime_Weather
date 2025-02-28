import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import Error from './Component/Error';
import Home from './Component/home';

function App() {
  return (
    <Router>
     <Routes>
        <Route path="/" Component={Home} />
        <Route path='/errorP' Component={Error} />
      </Routes>
    </Router>
  );
}

export default App;
