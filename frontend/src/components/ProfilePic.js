import React, { Component, useState } from 'react'
import { useSelector } from 'react-redux';
import ImageProfilePic from './ImageProfilePic';
import Modal from './Modal';
import UploadFormProfilePic from './UploadFormProfilePic';
import './ImageUpload.css'


function App() {
        const [selectedImg, setSelectedImg] = useState(null);

        const getDetails = useSelector((state) => state.getDetails);
        const { user } = getDetails;

        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;
        
        return (
          <div className="AppFireGram">

            {user._id === userInfo._id && <UploadFormProfilePic />}
                
            
            <ImageProfilePic setSelectedImg={setSelectedImg} />
            { selectedImg && (
              <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            )}
          </div>
        );
}
      
export default App;
