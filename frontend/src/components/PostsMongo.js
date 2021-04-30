import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { like , getLikes } from '../actions/likeCommenentActions';
import Modal from "react-modal"

class PostsMongo extends Component {


        constructor(){
                super();
                this.state = {
                        likedPosts : [] ,

                        likeModal : false


                        //history push doesnt work in components remember
                }
        }


        likeHandle = (_id) => {
                console.log(_id);

                if(this.state.likedPosts.indexOf(_id) != -1){


                        var newlp = this.state.likedPosts.filter(e=> e !== _id) ;
                        console.log(newlp);
                        this.setState({ likedPosts : newlp })
                        console.log('it was present');

                }
                else{

                        this.setState({ likedPosts : [...this.state.likedPosts , _id ] })
                        
                        console.log('it was not present');

                }


                this.props.like({ id : this.props.user._id , postid : _id })

                // axios.put(`/api/likecomment/like/${this.props.user._id}/${_id}` , {} , {
                //         headers: { Authorization: `Bearer ${this.props.userInfo.token}` } } )  


        }



        handleGetLikes = (_id) => {

                this.props.getLikes({ id : this.props.user._id , postid : _id })

                this.setState({likeModal:true})

        }



        render() {
        
        const {user , userInfo , likers , loadingLikers , history } = this.props
        const {likedPosts} = this.state



        return (
                <div>

                 <button onClick={()=>console.log(likedPosts)} ></button>                       
                {user && user.posts &&  user.posts.reverse().map((x , i) => (
                        
                        <Container>
                                <Row>
                                <Col>
                                
                                <div className='img-wrap' ><img src={x.pic} ></img></div>
                                <div><h2>{x.caption}</h2></div>
                                <div><h1><b style={{cursor:'pointer'}} onClick={ () => this.handleGetLikes(x._id)} >{ 
                                
                                
                                
                                x.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(x._id) == -1 ? <>{x.likes.length }</> : 
                                x.likes.indexOf(userInfo._id) == -1 && likedPosts.indexOf(x._id) != -1 ? <>{x.likes.length + 1}</> :  
                                x.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(x._id) != -1 ? <>{x.likes.length + -1}</> :  
                                x.likes.indexOf(userInfo._id) == -1 && likedPosts.indexOf(x._id) == -1 ? <>{x.likes.length + 0}</> :  
                                <>{x.likes.length}</>
                                
                                
                                
                                } like</b> </h1></div>
                                <div><h2>{x.createdAt}</h2></div>
                                
                                <div> <button onClick={ () => this.likeHandle(x._id)} >

                                {
                                
                                x.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(x._id) == -1 ? <>Liked</> : 
                                x.likes.indexOf(userInfo._id) == -1 && likedPosts.indexOf(x._id) != -1 ? <>Liked</> :
                                x.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(x._id) != -1 ? <>Like</> :  
                                        <>Like</>
                        
                        
                                }        

                                {/* there is no such case in which db and state can represent liked at same time */}



                                </button> </div>
                                
                                </Col>
                                </Row>

                                { this.state.likeModal && (
                                <Modal isOpen ={true} onRequestClose = { ()=>this.setState({likeModal:false}) } >
                                
                                <div>
                                
                                {likers && !loadingLikers && likers.map( (x,i)=>(
                                        
                                        <div className=''>
                                                <img src={x.profilePic} style={{width:'150px' , height:'150px' , borderRadius:'50%', cursor :'pointer' }} alt='a pic' 
                                                onClick={ () => {history.push(`/families/${x._id}`)} }></img>
                                                <h1 >{x.name}</h1>
                                        </div>
                                        
                                ) ) }
                                {loadingLikers && <div>loading</div> }

                                </div>

                                </Modal>
                )}


                                </Container>
                ) )}






                                
                </div>
        )
        }
}



export default connect(
        
        (state) => ({ 
                userInfo : state.userSignin.userInfo ,
                user : state.getDetails.user , 

                likers : state.getLikes.users ,
                loadingLikers : state.getLikes.loading ,
        }),
        {
                like , getLikes
        } 
      
)(PostsMongo);
