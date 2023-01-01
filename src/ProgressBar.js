import React from 'react';
import FileUpload from './FileUpload';

const ProgressBar = ({ file, setFile }) => {
  const { images, uploadProgress } = FileUpload(file);

  return <div className='progress-bar'>ProgressBar</div>;
};

export default ProgressBar;
