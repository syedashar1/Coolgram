import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap';
import ProfilePic from "../components/ProfilePic"
import { update, userDetails, userSuggest } from '../actions/userActions';
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"
import axios from 'axios';
import ChatApp from '../chat/components/ChatApp';
import TabPanel from "../components/UserProfileTabs"
import UploadForm from "../components/UploadForm"
import HeadShake from 'react-reveal/HeadShake';
import Suggestions from '../components/Suggestions';
import { SocketProvider } from '../chat/contexts/SocketProvider';



export default function UserProfile(props) {


        const dispatch = useDispatch()
        const productId = props.match.params.id;

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);


        const updateSuccess = useSelector((state) => state.userUpdateStatus.success);
        const updateError = useSelector((state) => state.userUpdateStatus.error);


        const suggestedUsers = useSelector((state) => state.userSuggestion.Suggestedusers);
        const suggestionLoading = useSelector((state) => state.userSuggestion.loading);



        const [EditState, setEditState] = useState(false)

        const [Message, setMessage] = useState('')
        const [openModal, setopenModal] = useState(false)


        const [Name, setName] = useState(null)
        const [Email, setEmail] = useState(null)
        const [Bio, setBio] = useState(null)
        const [NewPassword, setNewPassword] = useState('')
        const [OldPassword, setOldPassword] = useState('')





        useEffect(() => {
                
                if(props.match.params.id){
                        dispatch(userDetails(props.match.params.id))
                        dispatch(userSuggest(props.match.params.id))

                }
                else{
                        dispatch( userDetails() ) 

                }

        }, [productId])



        useEffect(() => {

                console.log(updateError);

                if(updateSuccess){
                        setEditState(false)
                }
                if(updateError){
                        setEditState(true)
                }
        }, [updateError , updateSuccess])




        const submitHandler = (e) => {

                e.preventDefault()


                axios.put(`/api/chat/singletext/${userInfo._id}`, {text : Message , recipients: [user._id] }  );
                setopenModal(false)

        }


        const handleEdit = () => {
                setEditState(true)
                setName(user.name)
                setEmail(user.email)
                setBio(user.bio)
                setNewPassword('')
        }


        const submitEditInfo = () => {
                dispatch( update({
                        name : Name , 
                        email : Email ,
                        bio : Bio ,
                        oldPassword : OldPassword , 
                        newPassword : NewPassword
                }) )
        }



        return (
                <div>

                {userInfo && userInfo._id && <ChatApp show={true} />}
                {user && user._id === userInfo._id &&
                <p style={{textAlign:'right'}}>
                <button 
                onClick={handleEdit}
                style={{fontSize:"20px",height:'50px'}} className='btn btn-lg btn-dark'>Edit Profile</button> 
                </p>
                }
                {user && <Container style={{marginTop:'30px'}}>
                        
                        <Row  >
                        <Col style={{marginBottom:'20px'}} xs={4} >
                        
                        <ProfilePic></ProfilePic>

                        </Col >
                        <Col xs={4} >

                        {EditState ? 
                        <input 
                        value = {Name}
                        onChange = {(e)=>setName(e.target.value)}
                        style={{fontSize:'30px',fontWeight:'bold'}} /> :
                        <h1 style={{fontSize:'50px',fontWeight:'bold'}} >{ Name || user.name}</h1>}

                        {EditState ? 
                        <input
                        value = {Email}
                        onChange = {(e)=>setEmail(e.target.value)}
                        style={{color:'#666666',marginBottom:'30px'}} /> :
                        <p style={{color:'#666666',marginBottom:'30px'}}>{Email || user.email}</p>}

                        <p style={{color:'red'}}>{updateError && updateError.existingEmail  && <HeadShake> {updateError.existingEmail} </HeadShake>  }</p>

                        </Col>
                        <Col xs={4} >
                        <Container>
                        <Row>
                        {!EditState && <Col>
                        <p className='text-center'> <span  style={{fontSize:'50px',fontWeight:'bold'}}>{user.posts.length }</span> <span>Posts</span> </p>
                        </Col>}
                        </Row>
                        </Container>



                        </Col>


                        </Row>
                        

                
                <div className='text-center' >
                {EditState ? 
                        <div>
                        <textarea
                        value = { Bio}
                        onChange = {(e)=>setBio(e.target.value)} 
                        rows='4' cols='20' />
                         
                        <br></br>

                        <p>Confirm current Password</p>
                        
                        <p style={{color:'red'}}>
                        {updateError && updateError.notMatched && <HeadShake> {updateError.notMatched} </HeadShake> }</p>
                        
                        <input type='password' onChange={e=>setOldPassword(e.target.value)} ></input>
                        <p>Set New Password</p>
                        <input type='password' onChange={e=>setNewPassword(e.target.value)} ></input>

                        <div style={{padding:'20px'}}>
                        <button 
                        style={{fontSize:"20px",height:'50px'}} className='btn btn-lg btn-dark'
                        onClick={submitEditInfo} >Update</button>
                        <button 
                        style={{fontSize:"20px",height:'50px'}} className='btn btn-lg btn-dark'
                        onClick={()=>setEditState(false)} >Cancel</button>
                        </div>

                        </div> :
                        <h1 >{ Bio || user.bio}</h1>


                }
                
                </div>

                


                <div style={{height:'20px'}} />
                

                {!EditState &&
                <div>
                {user._id === userInfo._id ? <><UploadForm /></> : 
                <p className='text-center'><button onClick={()=>setopenModal(true)} >Message</button></p>
                }
                </div>
                
                }


                </Container >


                }
                

                




                { suggestedUsers && user && user._id !== userInfo._id && 

                <div>
                <Suggestions users = {suggestedUsers} />
                </div>
                
                } 

                

                {openModal && (
                <Modal isOpen ={true} onRequestClose = { ()=>setopenModal(false) }
                style={{
                        content: {
                          margin: 'auto',
                          border: '1px solid #ccc',
                          borderRadius: '0px',
                          padding: '10px',
                          maxWidth:'660px',
                          maxHeight:'330px',
                        }
                      }}

                >
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

                
                {<SocketProvider id={userInfo._id }>
                        {!EditState && user && <TabPanel/> }
                </SocketProvider>}
               



                
                
                
                        
        
        </div>
        )
}
