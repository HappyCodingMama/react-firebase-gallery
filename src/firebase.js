import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyApbhSBoLx0l_4JSM5PBXAED0FUHtDv3to',
  authDomain: 'react-mygallery.firebaseapp.com',
  projectId: 'react-mygallery',
  storageBucket: 'react-mygallery.appspot.com',
  messagingSenderId: '548391923554',
  appId: '1:548391923554:web:46ee2a2b200f4783d2c63b',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
