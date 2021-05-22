import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import { Container, Image, Row } from 'react-bootstrap';
import Modal from "react-modal"
import SinglePost from './SinglePost';

export default function NamePicNotification({type , by , post , comment , id }) {



        const [state ,setState ] = useState({})
        const [state2 ,setState2 ] = useState({})
        const [loading, setloading] = useState(false)
        const [loading2, setloading2] = useState(false)
        const [showModal, setShowModal] = useState(false)
        const history = useHistory()


        useEffect(() => {
                
                setloading(true)
                axios.get(`/api/users/single/${by}`)
                .then(res => {
                        setState(res.data);
                        setloading(false)
                })


                setloading2(true)
                axios.get(`/api/newsfeed/getpost/${id}/${post}`)
                .then(res => {
                        setState2(res.data);
                        setloading2(false)
                } )

                

        }, [ ]);


        return (
                <Container>
                        {!loading && state !== {} && state2 && state2.post && 
                        
                        <Row>
                        <div>
                                
                        <br></br><br></br>
                        <img style={{height:'100px',width:'100px',borderRadius:'50%'}} src={state.profilePic} />
                        <p onClick={ () => {history.push(`/user/${by}`)} } >{state.name}</p>

                        {type === 'like' && <p>Liked Your Post</p> }
                        {type === 'comment' && <div>
                        <p>Commented on Your Post : <b>{comment && comment}</b> </p> 
                        
                        </div>
                        }
                        </div>
                        
                        <div style={{width:'300px' ,height:'200px' , overflow : 'hidden' }} onClick={()=>setShowModal(true)} >
                        <Image src={state2.post.pic} alt='a pic' ></Image>
                        
                        </div>
                        
                        </Row>
                        
                        }
                        { loading || loading2 && <p>Loading...</p> }

                        { showModal && 
                                <Modal 
                                style={{
                                        content: {
                                          margin: 'auto',
                                          border: '1px solid #ccc',
                                          borderRadius: '0px',
                                          padding: '0px',
                                          maxWidth:'650px',
                                        }}}
                                
                                isOpen ={true} onRequestClose = { ()=>setShowModal(false) } >
                                
                                <Container style={{padding:'0px'}}>
                                <SinglePost id={id} postid={post} />
                                </Container>

                                </Modal>
                        }

                        
                </Container>
        )
}

