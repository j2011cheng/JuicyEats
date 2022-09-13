import { Routes, Route } from 'react-router-dom';
import './App.css';

import Dash from './components/Dash';
import NewUser from './components/NewUser';
import EditUser from './components/EditUser';

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Dash />} />
        <Route path='newuser' element={<NewUser />} />
        <Route path='users'>
          <Route path=':id' element={<EditUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
