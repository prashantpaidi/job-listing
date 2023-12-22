import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './addjob.css';

export default function AddJob() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    logoURL: '',
    position: '',
    salary: '',
    jobType: '',
    remote: '',
    location: '',
    description: '',
    aboutCompany: '',
    skills: '',
  });
  console.log(formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const { id, edit } = state || {};
    console.log(edit);
    if (edit) {
      setEdit(edit);
    }
    if (id) {
      setId(id);
      const options = { method: 'GET' };
      fetch(`http://localhost:3000/jobs/${id}`, options)
        .then((response) => response.json())
        .then((response) => setFormData({ ...response.job }))
        .catch((err) => console.error(err));
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.companyName ||
      !formData.logoURL ||
      !formData.position ||
      !formData.salary ||
      !formData.jobType ||
      !formData.remote ||
      !formData.location ||
      !formData.description ||
      !formData.aboutCompany ||
      !formData.skills
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const token = localStorage.getItem('token');
    const recruiterName = localStorage.getItem('recruiterName');
    if (!token) {
      navigate('/login');
      return;
    }
    const data = { ...formData, recruiterName: recruiterName };

    try {
      const response = await fetch('http://localhost:3000/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert('An error ocurred, please try again');
      }

      const responseData = await response.json();
      console.log(responseData);
      alert('Job created successfully');
      navigate('/');
    } catch (error) {
      console.error('There was a problem with the request:', error);
    }
  };
  const handleCancel = () => {
    navigate('/');
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    if (
      !formData.companyName ||
      !formData.logoURL ||
      !formData.position ||
      !formData.salary ||
      !formData.jobType ||
      !formData.remote ||
      !formData.location ||
      !formData.description ||
      !formData.aboutCompany ||
      !formData.skills
    ) {
      alert('Please fill in all fields.');
      return;
    }
    const token = window.localStorage.getItem('token');
    const recruiterName = window.localStorage.getItem('recruiterName');
    if (!token) {
      navigate('/login');
      return;
    }
    const data = { ...formData, recruiterName: recruiterName };
    try {
      const response = await fetch(`http://localhost:3000/jobs/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert('An error ocurred, please try again');
      }

      const responseData = await response.json();
      console.log(responseData);
      alert('Job edited successfully');
      navigate('/');
    } catch (error) {
      console.error('There was a problem with the request:', error);
    }
  };

  return (
    <div className='add-job'>
      <div className='add-job-left'>
        <h3 className='reg-h'>Add job description</h3>
        <form
          className='add-job-form'
          onSubmit={edit ? handleEdit : handleSubmit}
        >
          <div className='flex input-box'>
            <label htmlFor='companyName'>Company Name</label>
            <input
              type='text'
              name='companyName'
              placeholder='Enter your company name here'
              className='add-job-input'
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className='flex input-box'>
            <label htmlFor='logoURL'>Add logo URL</label>
            <input
              type='text'
              name='logoURL'
              placeholder='Enter the link'
              className='add-job-input'
              value={formData.logoURL}
              onChange={handleChange}
            />
          </div>

          <div className='flex input-box'>
            <label htmlFor='position'>Job Position</label>
            <input
              type='text'
              name='position'
              placeholder='Enter job position'
              className='add-job-input'
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          <div className='flex input-box'>
            <label htmlFor='salary'>Monthly Salary</label>
            <input
              type='text'
              name='salary'
              placeholder='Enter Amount in rupees'
              className='add-job-input'
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div className='flex input-box select-type-box'>
            <label
              htmlFor='jobType'
              style={{ flexGrow: 'unset', marginRight: '3rem' }}
            >
              Job Type
            </label>
            <select
              name='jobType'
              className='add-job-input input-select-type'
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value=''>Select</option>
              <option value='Full-time'>Full Time</option>
              <option value='Part-time'>Part Time</option>
              <option value='Contract'>Contract</option>
            </select>
          </div>

          <div className='flex input-box select-type-box'>
            <label
              htmlFor='remote'
              style={{ flexGrow: 'unset', marginRight: '3rem' }}
            >
              Remote/Office
            </label>
            <select
              name='remote'
              className='add-job-input input-select-type'
              value={formData.remote}
              onChange={handleChange}
            >
              <option value=''>Select</option>
              <option value={true}>Remote</option>
              <option value={false}>Office</option>
            </select>
          </div>

          <div className='flex input-box'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              placeholder='Enter Location'
              className='add-job-input'
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className='flex input-box'>
            <label htmlFor='description'>Job Description</label>
            <textarea
              name='description'
              placeholder='Type the job description'
              className='add-job-input job-description'
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className='flex input-box'>
            <label htmlFor='aboutCompany'>About Company</label>
            <textarea
              name='aboutCompany'
              placeholder='Type about your company'
              className='add-job-input about-company'
              value={formData.aboutCompany}
              onChange={handleChange}
            />
          </div>

          <div className='flex input-box'>
            <label htmlFor='skills'>Skills Required</label>
            <input
              type='text'
              name='skills'
              placeholder='Enter the must-have skills'
              className='add-job-input'
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className='flex input-box'>
            <label htmlFor='Information'>Information</label>
            <input
              type='text'
              name='Information'
              placeholder='Enter the additional information'
              className='add-job-input'
            />
          </div>

          <div className='edit-job-btns flex'>
            <button onClick={handleCancel} className='button cancel-btn'>
              Cancel
            </button>
            <button type='submit' className='button add-job-btn'>
              {edit ? 'Edit Job' : '+ Add Job'}
            </button>
          </div>
        </form>
      </div>

      <div className='add-job-right'>
        <p className='right-section-text'>Recruiter add job details here</p>
      </div>
    </div>
  );
}
