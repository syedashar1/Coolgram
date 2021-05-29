import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listUsers } from '../actions/userActions' ;
import { Accordion, Card, Carousel, Col, Container, Row , Image } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import SinglePost from '../components/SinglePost';
import Navbar from '../components/Navbar';
import { SocketProvider } from '../chat/contexts/SocketProvider';
import { ContactsProvider } from '../chat/contexts/ContactsProvider';
import { ConversationsProvider } from '../chat/contexts/ConversationsProvider';
import Dashboard from '../chat/components/Dashboard';
import ChatApp from '../chat/components/ChatApp';

export default function NewsFeedScreen() {

        const userList = useSelector((state) => state.userList);
        // const { loading, error, users } = userList;

 
        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;

        const dispatch = useDispatch();
        const history = useHistory()

        const [state ,setState ] = useState([])
        const [page ,setPage ] = useState(1) 
        const [loading, setloading] = useState(false)


        useEffect(() => {
                
                setloading(true)
                axios.get(`/api/newsfeed?pageNumber=${page}`)
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
                                        {state.reverse().map( x => <div style={{marginBottom:'100px'}} >
                                        <SinglePost id={x.postedBy} postid={x.postId} />
                                        </div>

                                        )}
                                </SocketProvider>   

                        </div>
                        
                        
                        }
                        </InfiniteScroll>

</div>
                        <h1>{loading ? <p> Loading... </p> : <h1> the end </h1>  }</h1>

                </div>
        )
}
