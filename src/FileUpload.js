import React, { useState, useEffect } from 'react';
import { storage, db } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useNavigate } from 'react-router-dom';
import {
  doc,
  collection,
  setDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import './fileupload.scss';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  console.log(uploadProgress);

  useEffect(() => {
    loadAllImages();
    setFile();
  }, [setFile]);

  const loadAllImages = async () => {
    const q = await getDocs(collection(db, 'images'));
    let currImages = [];
    q.forEach((doc) => {
      currImages = [...currImages, doc.data().imageUrl];
    });
    setImages(currImages);
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file == '') {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('download url:', downloadURL);
            const imageStoreRef = doc(db, 'images', file.name);
            setDoc(imageStoreRef, {
              imageUrl: downloadURL,
              createdAt: serverTimestamp(),
            });
          });
          loadAllImages();
          setUploadProgress(0);
        }
      );
      setError('');
    } else {
      setError('Please select an image file');
    }
  };

  return (
    <div className='upload-container'>
      <div className='file-container'>
        <div className='file-upload'>
          <div className='file-input'>
            <input type='file' accept='/image/*' onChange={handleChange} />
          </div>
          <div className='submit-btn'>
            <button type='submit' onClick={handleUpload}>
              submit
            </button>
          </div>
        </div>

        <div className='output'>
          {error && <div className='error'>{error}</div>}
        </div>
        {file && (
          <div
            className='progress-bar'
            style={{ width: uploadProgress + '%' }}
            file={file}
          ></div>
        )}
      </div>
      <div className='image-container'>
        {images &&
          images
            .slice()
            .reverse()
            .map((imageUrl) => {
              return (
                <div className='image-item' key={imageUrl}>
                  <img src={imageUrl} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default FileUpload;
