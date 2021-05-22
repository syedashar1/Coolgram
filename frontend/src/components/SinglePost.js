import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import NamePic from './NamePic';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, like , comment, editCaption, deletePost } from '../actions/likeCommenentActions';
import Modal from "react-modal"
import { useSocket } from '../chat/contexts/SocketProvider';
import { window } from 'globalthis/implementation';
import { motion } from 'framer-motion';

export default function SinglePost({ id , postid }) {



        const [state ,setState ] = useState({})
        const [likedPosts, setlikedPosts] = useState([])
        const [loading, setloading] = useState(false)
        const [likeModal, setlikeModal] = useState(false)
        const [commentedPosts, setcommentedPosts] = useState([])
        const [ShowEditField, setShowEditField] = useState(false)
        const [Caption, setCaption] = useState(null)
        const [CommentsLength, setCommentsLength] = useState(0)
        const [ShowComments, setShowComments] = useState(0)
        const [Deleted, setDeleted] = useState(false)


        const [Saved, setSaved] = useState(false)
        const [SavedinDB, setSavedinDB] = useState(false)

        const [cc, setcc] = useState('')

        const history = useHistory()
        const dispatch = useDispatch();


        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;

        const likers = useSelector((state) => state.getLikes.users);
        const loadingLikers = useSelector((state) => state.getLikes.loading);

        const socket = useSocket()


        useEffect( async () => {
                
                setloading(true)
                axios.get(`/api/newsfeed/getpost/${id}/${postid}`)
                .then(res => {
                        setState(res.data);
                        setloading(false);
                        setCaption(res.data.post.caption);
                        setCommentsLength(res.data.post.comments.length)
                        if(res.data.post.comments.length>2) 
                                setShowComments(res.data.post.comments.length - 2)
                } )

                const x = await axios.get(`/api/users/onlysaved/${userInfo._id}`)
                for(var i = 0 ; i < x.data.savedPosts.length ; i++ ){
                        if (x.data.savedPosts[i].postId == postid ) {
                          setSavedinDB(true)
                          break
                        }
                }

                

        }, [ ]);





        const likeHandle = (_id) => {
                console.log(_id);
                console.log(likedPosts);
                console.log(state.post.likes.indexOf(userInfo._id));


                // state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state._id) == -1 ? <>Liked</> : 

                if(likedPosts.indexOf(_id) != -1){

                        var newlp = likedPosts.filter(e=> e !== _id) ;
                        setlikedPosts( newlp )
                        console.log('it was present');


                }
                else{

                        setlikedPosts( [...likedPosts , _id ] )
                        console.log('it was not present');

                        socket.emit('send-notification', { type : 'like' , by : userInfo._id , post : postid , comment : null , to : id })


                }
                
                dispatch( like({ id , postid }) )
 
        }


        const handleGetLikes = (_id) => {

                dispatch( getLikes({ id  , postid  }) )
                
                setlikeModal(true)

        }




        const handleComments = ( ) => {

                const commentedText = cc
                if(commentedText === '') return;

                dispatch( comment({id  , postid  , comment : commentedText }) )

                setCommentsLength(CommentsLength+1)
                setcc('')

                var x = commentedPosts.push({
                        post : postid ,
                        comments : [{ id : userInfo._id , comment : commentedText  }]
                })

                socket.emit('send-notification', { type : 'comment' , by : userInfo._id , post : postid , comment : commentedText , to : id })


                setcommentedPosts( [...commentedPosts , x] )
                console.log(commentedPosts)

                return
        }



        const handleSavePosts = () => {

                if(Saved) {setSaved(false)}
                else setSaved(true)

                axios.put(`/api/likecomment/savepost/${id}/${postid}`, { } , {
                        headers: { Authorization: `Bearer ${userInfo.token}`} } )  
               
        }


        const handleEditSubmit = () => {

                setShowEditField(false)
                console.log(Caption);

                dispatch( editCaption({ id , postid , caption : Caption }) )
        }


        const handleDelete = () => {

                if (window.confirm("Delete this post ?")) {
                        dispatch(  deletePost({ id  , postid  })  )
                        setDeleted(true)
                } 
                else { return }

        }


        const handleShowMoreComments = () => {

                console.log(ShowComments);

                if( (ShowComments-6) > 2){
                        setShowComments(ShowComments-6)
                }
                else{
                        setShowComments(0)
                }

        }






        return (
                <div > 
                        {!loading && state && state._id && !Deleted  &&
                        

                        <motion.div 
                        initial={{ y: "-100vh" }} 
                        animate={{ y: 0 }} >

                        <Container style={{maxWidth:'650px',background:'grey',padding:'0px'}}>
                                <Row style={{margin:'0px',padding:'0px'}}>
                                <Col >

                                <div className='row' >
                                        <p><Image src={state.profilePic} style={{width:'85px' , height:'85px' , borderRadius:'50%', cursor :'pointer' }} alt='a pic' 
                                        onClick={ () => {history.push(`/user/${state._id}`)} }/><span>{state.name}</span></p>
                                        {userInfo._id === id && <div className="dropdown">
                                        Dots
                                                <ul className="dropdown-content-for-post" >
                                                        <li onClick={()=>setShowEditField(true)} >Edit</li>
                                                        <li onClick={()=> handleDelete() }>Delete</li>
                                                </ul>
                                        </div>}
                                </div>
                                <div><div ><img style={{width:'100%'}} src={state.post.pic} ></img></div></div>
                                
                                <div><h1><b style={{cursor:'pointer'}} onClick={ () => handleGetLikes(state.post._id)} >{ 
                                
                                
                                
                                state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state.post._id) == -1 ? <>{state.post.likes.length }</> : 
                                state.post.likes.indexOf(userInfo._id) == -1 && likedPosts.indexOf(state.post._id) != -1 ? <>{state.post.likes.length + 1}</> :  
                                state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state.post._id) != -1 ? <>{state.post.likes.length + -1}</> :  
                                state.post.likes.indexOf(userInfo._id) == -1 && likedPosts.indexOf(state.post._id) == -1 ? <>{state.post.likes.length + 0}</> :  
                                <>{state.post.likes.length}</>
                                
                                
                                
                                } like</b> </h1></div>


                                <div><h2>{state.createdAt}</h2></div>


                                {ShowEditField ?
                                <div>
                                <form style={{textAlign:'center'}} onSubmit={handleEditSubmit}>
                                <textarea  
                                rows="3" cols="25" type="text" 
                                value={Caption} onChange={(e)=>setCaption(e.target.value)}>
                                </textarea><br/>
                                <button type='submit'>Done</button>
                                </form>
                                </div>

                                :

                                <div><h2>{Caption}</h2></div>

                                }


                                
                                <div> <button onClick={()=> likeHandle(state.post._id) } >

                                {
                                
                                state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state.post._id) == -1 ? <>Liked</> : 
                                state.post.likes.indexOf(userInfo._id) == -1 && likedPosts.indexOf(state.post._id) != -1 ? <>Liked</> :
                                state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state.post._id) != -1 ? <>Like</> :  
                                        <>Like</>
                        
                        
                                }        

                                {/* there is no such case in which db and state can represent liked at same time */}

                                

                                </button>
                                
                                {CommentsLength + ' comments'}

                                {ShowComments > 0 &&
                                <span onClick={handleShowMoreComments} style={{cursor:'pointer'}} ><b>Show More</b></span>
                                }

                                <div style={{maxHeight:'400px',overflowY:'auto',maxWidth:'650px',background:'white'}} >


                                {state.post.comments && 
                                        state.post.comments
                                                .slice( ShowComments , state.post.comments.length)
                                                .map((c) =>
                                                        <div>
                                                        <p><NamePic bystate={false} id={c.id} comment={c.comment}/></p>
                                                        </div>) 
                                }
                                
                                {commentedPosts.map((y)=> <div> {y.post === postid && y.comments.map((z) => <div><p><NamePic bystate={true} id={z.id} comment={z.comment}/></p></div>)  } </div> )}
                                </div>
                                
                                <input value={ cc } onChange={(e) => setcc(e.target.value) } />
                                <button onClick={()=> handleComments()} >send</button>
                                </div>

                                <div><button onClick={()=>handleSavePosts()}>
                                {
                                
                                
                                !SavedinDB && Saved ? <>saved</> :
                                SavedinDB && !Saved ? <>saved</> :
                                SavedinDB && Saved ? <>save</> : <>save</>

                                        
                                        
                                }
                                </button></div>
                                
                                </Col>
                                </Row>

                                { likeModal && (
                                <Modal isOpen ={true} onRequestClose = { ()=> setlikeModal(false) } >
                                
                                <div>
                                
                                {likers && !loadingLikers && likers.map( (x,i)=>(
                                        
                                        <div className=''>
                                                <img src={x.profilePic} style={{width:'100px' , height:'100px' , borderRadius:'50%', cursor :'pointer' }} alt='a pic' 
                                                onClick={ () => {history.push(`/user/${x._id}`)} }></img>
                                                <h1 >{x.name}</h1>
                                        </div>
                                        
                                ) ) }
                                {loadingLikers && <div>loading</div> }


                                </div>

                                </Modal>
                )}


                                </Container>
                        </motion.div>


                        }
                        {loading && 'loading...'}
                        
                        
                        
                </div>
        )
}






