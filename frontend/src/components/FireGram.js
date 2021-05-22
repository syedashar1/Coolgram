import React, { Component, useState } from 'react'
import { useSelector } from 'react-redux';
import ImageGrid from './ImageGrid';
import Modal from './Modal';
import UploadForm from './UploadForm';
import './ImageUpload.css'


function App() {
        const [selectedImg, setSelectedImg] = useState(null);

        const getDetails = useSelector((state) => state.getDetails);
        const { user } = getDetails;

        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;

        
        return (
          <div>

            {user._id === userInfo._id && <UploadForm />}
                
            
            <ImageGrid setSelectedImg={setSelectedImg} />
            { selectedImg && (
              <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            )}
          </div>
        );
}
      
      export default App;
