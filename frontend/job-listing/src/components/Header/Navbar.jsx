import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('token');

    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className='header'>
      <div
        className='logo'
        style={{
          color: '#ffff',
          fontWeight: '700',
          fontSize: '1.5rem',
          marginLeft: '2rem',
          marginTop: '1.5rem',
        }}
      >
        Jobfinder
      </div>
      <svg
        width='349'
        height='55'
        viewBox='0 0 349 63'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='svg-1'
      >
        <path d='M0 0L349 63H55C24.6243 63 0 38.3757 0 8V0Z' fill='#FF6B6B' />
      </svg>

      <svg
        width='390'
        height='94'
        viewBox='0 0 390 94'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='svg-2'
      >
        <path
          d='M0 0H390L104.665 87.75L93.015 91.4154C68.2633 99.2033 41.5584 87.5523 30.4315 64.1111L0 0Z'
          fill='#FF6B6B'
        />
      </svg>

      <svg
        width='380'
        height='159'
        viewBox='0 0 405 139'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='svg-3'
      >
        <path
          d='M0 0H381.5L394.5 68.5L404.232 121.28C405.932 130.498 398.855 139 389.481 139H135.734C109.156 139 82.8212 133.928 58.1436 124.057C28.8646 112.346 8.53189 85.3189 5.39409 53.9409L0 0Z'
          fill='#FF6B6B'
        />
      </svg>
      {!isLoggedIn && (
        <div className='btns'>
          <button
            className='buttons outlined-btn'
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className='buttons filled-btn'
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      )}
      {isLoggedIn && (
        <div className='a-loggin-btns flex '>
          <button
            onClick={() => handleLogout()}
            className='logout a-loggin logout-btn'
          >
            Logout
          </button>

          <h3 className='a-loggin'>Hello Recruiter</h3>
        </div>
      )}
    </div>
  );
}
