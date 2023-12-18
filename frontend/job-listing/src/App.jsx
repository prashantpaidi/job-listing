import './App.css';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './HomePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
