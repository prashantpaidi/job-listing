import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch('http://localhost:3000/users/register', {
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
      localStorage.setItem('recruiterName', responseData.recruiterName);
      localStorage.setItem('name', responseData.name);
      localStorage.setItem('token', responseData.token);
      navigate('/');
    } catch (error) {
      alert('There was a problem with the request, please try again');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-left'>
        <h3 className='auth-heading'>Create an account</h3>
        <p className='auth-subheading'>Your personal job finder is here</p>

        <form className='auth-form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            className='auth-input-field'
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='auth-input-field'
          />

          <input
            type='tel'
            name='mobile'
            placeholder='Mobile'
            value={formData.mobile}
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

          <div className='checkbox-container'>
            <input type='checkbox' />
            <p>
              By creating an account, I agree to our terms of use and privacy
              policy
            </p>
          </div>

          <button type='submit' className='auth-submit-btn'>
            Create Account
          </button>
        </form>

        <p className='auth-subheading'>
          Already have an account?{' '}
          <b>
            <Link to={'/login'} style={{ color: '#000' }}>
              Sign In
            </Link>{' '}
          </b>
        </p>
      </div>

      <div className='auth-right'>
        <p className='auth-right-text'>Your Personal Job Finder</p>
      </div>
    </div>
  );
}
