import { Routes, Route } from 'react-router-dom';
import './App.css';

import Dash from './components/Dash';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dash />} />
    </Routes>
  );
}

export default App;
