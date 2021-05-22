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
        const { docs } = useFirestore(`${user._id}'s profile-pic`);
        




        useEffect(() => {
                // if( docs.length >= 6 ){
                //         dispatch({ type: MAX_LIMIT_REACHED });
                // }
                // if( docs.length < 6 ){
                //         dispatch({ type: MAX_LIMIT_NOT_REACHED });
                // }

                // if(docs && docs[0]){
                //   Axios.put(`/api/users/profilepic`, { profilePic: docs[0].url } , {
                //     headers: {
                //       Authorization: `Bearer ${userInfo.token}`,
                      
                //     } } )
                //   console.log(docs[0].url);
                //   }
                
                
              }, [dispatch , docs ]);

      
        

  return (
    <div className="text-center" style={{maxWidth:'230px'}} >
        
        

<motion.div className="img-wrap" 
          layout
          whileHover={{ opacity : 1 }}s
        //   onClick={() => setSelectedImg(docs[0].url)}
          style = {{borderRadius : '50%'}}
        >
          <motion.img 
          src={ docs && docs[0] ? docs[0].url :
        ""
        } 
          alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>

    </div>
  )
}

export default ImageGrid;