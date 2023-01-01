import React from 'react';
import FileUpload from './FileUpload';

const ImageGrid = ({ setSelectedImg }) => {
  const { images } = FileUpload('images');

  console.log(images);
  return (
    <div className='image-container'>
      {images &&
        images.map((imageUrl) => {
          <div
            className='image-item'
            onClick={() => setSelectedImg(images.imageUrl)}
          >
            <img src={images.imageUrl} />
          </div>;
        })}
    </div>
  );
};

export default ImageGrid;
