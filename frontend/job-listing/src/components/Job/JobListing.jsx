import { useEffect, useState } from 'react';
import './JobListing.css';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import { skillsArray } from '../../constants.js';
export default function JobListing() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState([]);
  const [positionFilter, setPositionFilter] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('token');

    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  const handleSkillChange = (event) => {
    const selectedSkill = event.target.value;
    if (selectedSkill !== 'Skills' && !selectedSkills.includes(selectedSkill)) {
      const updatedSkills = [...selectedSkills, selectedSkill];
      setSelectedSkills(updatedSkills);
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = selectedSkills.filter(
      (selectedSkill) => selectedSkill !== skill
    );
    setSelectedSkills(updatedSkills);
  };


  useEffect(() => {
    // Fetch jobs based on filters
    const fetchJobs = async () => {
      try {
        const queryParams = new URLSearchParams({
          position: positionFilter,
        });

        if (selectedSkills) {
          selectedSkills.forEach((skill) => {
            queryParams.append('skills', skill);
          });
        }

        console.log(`http://localhost:3000/jobs?${queryParams}`);
        const response = await fetch(
          `http://localhost:3000/jobs?${queryParams}`
        );
        const data = await response.json();

        setJobs(data.jobs);
        console.log(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [selectedSkills, positionFilter]);

  return (
    <div>
      <div className=' flex'>
        <div className='home'>
          <div className='job-conatiner'>
            <div className='job-input-container'>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 27 27'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  style={{ position: 'absolute', top: '190px', left: '270px' }}
                >
                  <path
                    d='M21.3073 19.4279L27 25.1193L25.1193 27L19.4279 21.3073C17.3103 23.0049 14.6763 23.9282 11.9622 23.9244C5.35906 23.9244 0 18.5653 0 11.9622C0 5.35906 5.35906 0 11.9622 0C18.5653 0 23.9244 5.35906 23.9244 11.9622C23.9282 14.6763 23.0049 17.3103 21.3073 19.4279ZM18.6411 18.4417C20.3279 16.707 21.2699 14.3818 21.2661 11.9622C21.2661 6.82111 17.1019 2.65827 11.9622 2.65827C6.82111 2.65827 2.65827 6.82111 2.65827 11.9622C2.65827 17.1019 6.82111 21.2661 11.9622 21.2661C14.3818 21.2699 16.707 20.3279 18.4417 18.6411L18.6411 18.4417Z'
                    fill='#9C9C9C'
                  />
                </svg>
                <input
                  type='text'
                  name='search'
                  placeholder='Type any job title'
                  className='job-input'
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                />
              </div>

              <div
                className='select-skill flex'
                style={{
                  flexDirection: 'row',
                  margin: '0 4rem',
                  width: '87%',
                  justifyContent: 'flex-start',
                }}
              >
                <select
                  style={{ marginRight: '1rem' }}
                  onChange={handleSkillChange}
                  className='selected-skill-input'
                  placeholder='skills'
                >
                  {skillsArray.map((skill, index) => (
                    <option value={skill} key={index}>
                      {skill}
                    </option>
                  ))}
                </select>

                {selectedSkills.map((skill, index) => (
                  <div className='selected-skills flex' key={index}>
                    <div className='selected-skill flex'>
                      <div
                        className='skill-name'
                        style={{
                          backgroundColor: '#FFEEEE',
                          padding: '0.5rem 1rem',
                        }}
                      >
                        {skill}
                      </div>
                      <div
                        className='close'
                        style={{
                          color: '#ffff',
                          backgroundColor: '#FF6B6B',
                          padding: '0.5rem 0.6rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => removeSkill(skill)}
                      >
                        x
                      </div>
                    </div>
                  </div>
                ))}

                {isLoggedIn && selectedSkills ? (
                  <div
                    className='al-clear'
                    style={{ right: '800px' }}
                    onClick={() => setSelectedSkills([])}
                  >
                    Clear
                  </div>
                ) : (
                  <div className='clear' onClick={() => setSelectedSkills([])}>
                    Clear
                  </div>
                )}
                {isLoggedIn && (
                  <button
                    className='add-job-btn'
                    onClick={() => navigate('/add-job')}
                  >
                    + Add Job
                  </button>
                )}
              </div>
            </div>
            <div className='jobs' style={{ width: '100%' }}>
              {jobs &&
                jobs.map((job, index) => {
                  //   return 1;
                  return <JobCard key={index} job={job} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
