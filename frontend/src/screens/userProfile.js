import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Col, Container, Row } from 'react-bootstrap';
import ProfilePic from "../components/ProfilePic"
import { userDetails } from '../actions/userActions';
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"
import axios from 'axios';
import ChatApp from '../chat/components/ChatApp';
import SavedPosts from '../components/SavedPosts';
import FireGram from "../components/FireGram"

export default function UserProfile(props) {


        const dispatch = useDispatch()
        const productId = props.match.params.id;

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);

        const [Message, setMessage] = useState('')
        const [openModal, setopenModal] = useState(false)



        useEffect(() => {
                
                if(props.match.params.id){
                        dispatch(userDetails(props.match.params.id))

                }
                else{
                        dispatch( userDetails() ) 

                }

        }, [productId])


        const submitHandler = (e) => {

                e.preventDefault()


                axios.put(`/api/chat/singletext/${userInfo._id}`, {text : this.state.message , recipients: [user._id] }  );
                setopenModal(false)

        }



        return (
                <div>

                <h1>Profile Screens</h1>
                {userInfo && userInfo._id && <ChatApp show={true} />}
                {user && <ProfilePic/> }
                
                          
                          <div className="center">
                         <div>

                        {user && 
                        
                        <div>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.name}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.email}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.age}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.country}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.bio}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.posts.length} Posts </p>
                        
                        {user._id !== userInfo._id && <button onClick={()=>setopenModal(true)} >Message</button> }
                        
                        </div>

        
                        
                        }
                        
                        </div> 



                </div>

                

                { openModal && (
                <Modal isOpen ={true} onRequestClose = { ()=>setopenModal(false) } >
                                                <Zoom>
                                                <form className="form upgap text-center" onSubmit={submitHandler} >
                                                <textarea id="description" rows="5" cols="50" type="text" required="true"
                                                placeholder="Enter family description" onChange={(e) => setMessage(e.target.value) }
                                                ></textarea>
                                                <button>send</button>
                                                </form>
                                                </Zoom>

                                        </Modal>
                                )}








                {/* {user && <MapLocation/> } */}

               

                <div style={{padding:'20px'}}>
                {user && <FireGram/> }
                </div>
                {user && <SavedPosts/> }



                
                
                
                        
        
        </div>
        )
}
