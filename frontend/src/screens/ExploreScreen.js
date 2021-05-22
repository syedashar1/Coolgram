import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import SinglePost from '../components/SinglePost';
import ChatApp from '../chat/components/ChatApp';
import Modal from '../components/Modal';
import { SocketProvider } from '../chat/contexts/SocketProvider';
import { motion } from 'framer-motion';


export default function ExploreScreen() {


        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;
        const [selectedImg, setSelectedImg] = useState(null);
        const [postBy, setpostBy] = useState(null)
        const dispatch = useDispatch();
        const history = useHistory()
        const [state ,setState ] = useState([])
        const [page ,setPage ] = useState(1) 
        const [loading, setloading] = useState(false)


        useEffect(() => {
                
                setloading(true)
                axios.get(`/api/newsfeed/explore?pageNumber=${page}`)
                .then(res => {
                        console.log(res);
                        setState([...state , ...res.data]);
                        setloading(false)
                } )

                if(!userInfo || !userInfo._id ){ history.push('/signin') }

                

        }, [ page , userInfo ]);



        const scrollToEnd = () => {
                setPage(page + 1)

        }



        return (
                <div>

                        <InfiniteScroll
                        dataLength={state.length}
                        next={scrollToEnd}
                        hasMore={true}
                        style={{overflow:'visible'}}
                        >


                        { userInfo && userInfo._id && state.length > 0 && <div>

                                <ChatApp show={true} /> 
                                <SocketProvider id={userInfo._id }>
                                


                                <div className="img-grid">
                                {state.map(x => (
                                <motion.div className="img-wrap container-ofouter-image" key={x.postID}  layout
                                whileHover={{ opacity: 1 }}s
                                onClick={() => {setSelectedImg(x.postID) ; setpostBy(x.postedBy) }}
                                >
                                <img src={x.pic} alt="uploaded pic" className='image-to-hover'/>
                                <div className="middle-text">
                                <p>{x.totalLikes}</p>
                                </div>  
                                </motion.div>
                                ))}
                                </div>
                                { selectedImg && (
                                <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} postBy={postBy} />
                                )}


                                </SocketProvider>   

                        </div>
                        
                        
                        }



                        </InfiniteScroll>
                
                        
                </div>
        )
}
