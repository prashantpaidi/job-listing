import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData);
      localStorage.setItem('recruiterName', responseData.user.recruiterName);
      localStorage.setItem('email', responseData.user.email);
      localStorage.setItem('token', responseData.token);
      navigate('/');
    } catch (error) {
      alert('There was a problem with the request, please try again');
    }
  };
  return (
    <div className='auth-container'>
      <div className='auth-left'>
        <h3 className='auth-heading'>Already have an account?</h3>
        <p className='auth-subheading'>Your personal job finder is here</p>
        <form className='auth-form' onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='auth-input-field'
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='auth-input-field'
          />

          <button type='submit' className='auth-submit-btn'>
            Login
          </button>
        </form>
        <p className='auth-subheading'>
          Don’t have an account?
          <b>
            {' '}
            <Link to={'/register'} style={{ color: '#000' }}>
              Sign Up
            </Link>
          </b>
        </p>
      </div>

      <div className='auth-right'>
        <p className='auth-right-text'>Your Personal Job Finder</p>
      </div>
    </div>
  );
}
