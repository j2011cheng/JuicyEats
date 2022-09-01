import { Routes, Route } from 'react-router-dom';
import './App.css';

import Dash from './components/Dash';
import NewUser from './components/NewUser';

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Dash />} />
        <Route path='newuser' element={<NewUser />} />
      </Route>
    </Routes>
  );
}

export default App;
