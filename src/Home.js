import React from 'react';
import FileUpload from './FileUpload';
import './home.scss';

const Home = () => {
  return (
    <div className='container'>
      <div className='contents'>
        <div className='title'>
          <h3>My Gallery</h3>
        </div>
        <div className='upload'>
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default Home;
