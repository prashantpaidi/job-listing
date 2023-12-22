import React from 'react';
import Navbar from './components/Header/Navbar';
import JobListing from './components/Job/JobListing';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <JobListing />
    </div>
  );
}
