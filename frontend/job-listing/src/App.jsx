import './App.css';
import Register from './components/Auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import HomePage from './HomePage';
import AddJob from './components/Job/AddJob';
import JobDetail from './components/Job/JobDetail';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/add-job' element={<AddJob />} />
          <Route path='/job/:id' element={<JobDetail />} />{' '}
        </Routes>
      </Router>
    </>
  );
}

export default App;
