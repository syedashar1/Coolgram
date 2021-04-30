import React, { useState } from 'react';
import ProgressBarProfilePic from './ProgressBarProfilePic';
import CameraAltIcon from '@material-ui/icons/CameraAlt';


const UploadFormProfilePic = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  return (
    <form className='imgUpload' >
      <label className='imgUploadLabel' >
        <input type="file" className="filee" onChange={handleChange} ></input>
        <CameraAltIcon style={{fontSize:'50px'}}></CameraAltIcon>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <ProgressBarProfilePic file={file} setFile={setFile} /> }
      </div>
    </form>
  );
}

export default UploadFormProfilePic;