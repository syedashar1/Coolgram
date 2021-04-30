import React, { useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ImageGrid = ({ setSelectedImg }) => {



  const getDetails = useSelector((state) => state.getDetails);
  const { user } = getDetails;

        const dispatch = useDispatch();

        //here we take from firebase 
        const { docs } = useFirestore(`${user._id}`);
        




        useEffect(() => {
                // if( docs.length >= 6 ){
                //         dispatch({ type: MAX_LIMIT_REACHED });
                // }
                // if( docs.length < 6 ){
                //         dispatch({ type: MAX_LIMIT_NOT_REACHED });
                // }
                // if ( docs && docs.length !== 0){
                //         Axios.put(`/api/users/addimages/${userInfo._id}`, {docs} );
                //         console.log(docs);
                // }
              }, [dispatch , docs ]);

      
        

  return (
    <div className="img-grid">
      {docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id} 
          layout
          whileHover={{ opacity: 1 }}s
          onClick={() => setSelectedImg(doc.url)}
        >
          <motion.img src={doc.url} alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default ImageGrid;