import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile , caption , setcaption }) => {
  const { progress, url } = useStorage(file , caption ) ;

  useEffect(() => {
    if (url) {
      setFile(null)
      console.log(caption);
    }
  }, [url, setFile , setcaption]);

  return (
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
} 

export default ProgressBar;