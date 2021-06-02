import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { register , signin , signout } from '../actions/userActions' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/froms.css"
import Slide from 'react-reveal/Slide';






class RegisterScreen extends Component {

        constructor(){
                super();
                this.state = {
                        email : "" , 
                        password : "" ,
                        confirmPassword : "" ,

                        latitude : null , 
                        longitude : null , 

                        name :"",
                        age  : 0 ,
                        favouriteNotes : [],
                        familyDescription : "" ,

                        country : "",
                        city : "" , 

                        passwordNotMatched : false
                }





                this.getLocation = this.getLocation.bind(this)
                this.getCoordinates = this.getCoordinates.bind(this)



        }




        

        componentDidMount(){
                

                this.getLocation()


        }





        getLocation(){
                if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(this.getCoordinates , this.showError)
                }
                else {
                        alert('Geolocation is not supported by the browser')
                }
        }

        getCoordinates(position){
                this.setState({
                        latitude : position.coords.latitude , 
                        longitude : position.coords.longitude
                })
        }
        showError(error) {
                switch(error.code) {
                  case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.")
                    break;
                  case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.")
                    break;
                  case error.TIMEOUT:
                        alert("The request to get user location timed out.")
                    break;
                  default:
                        alert("An unknown error occurred.")
                    
                }
        }





         submitHandler  = async (e)  => {
                e.preventDefault()



                if( this.state.password !== this.state.confirmPassword ){
                        this.setState({ passwordNotMatched : true })
                        return
                }

                if(this.state.longitude === null){
                        alert('you need to provide your current location to register an account')
                        return
                }

                

                else {
                        this.setState({ passwordNotMatched : false })

                        const user = {
                                email : this.state.email,
                                password : this.state.password,
                                name : this.state.name,
                                age : this.state.age,
                                country : this.state.country,
                                city : this.state.city,
                                bio : this.state.bio,
                                favouriteNotes : this.state.favouriteNotes ,
                                


                                


                                location : {
                                        latitude : this.state.latitude , 
                                        longitude : this.state.longitude
                                        
                                } ,


                        }
                
                console.log(user);
                this.props.register( user )

                }


        }

render() {

        const redirect = this.props.location.search
        ? this.props.location.search.split('=')[1]
        : '/';
        if (this.props.userInfo) {
                
                this.props.history.push(redirect);
        }


        return (
        <Slide left>


                <form className="form text-center" style={{maxWidth:'460px' , marginTop:100}} onSubmit={this.submitHandler}>

                <div >
                <p className='logo'>Coolgram</p>
                <p className='desc' >Sign up to connect with the coolgram family.</p>
                </div>


                <div >
                <input type="text" id="full name" placeholder="Enter name" required onChange={(e) => this.setState({ name : e.target.value})}></input>
                </div>
                <div>
                <input type="email" id="email" placeholder="Enter email" required onChange={(e) => this.setState({ email : e.target.value})}></input>
                </div>
                <div>
                {this.props.registerError && (<> {this.props.registerError } </>)}
                <input type="password" id="password" placeholder="Enter password" required onChange={(e) => this.setState({ password : e.target.value})}></input>
                </div>
                <div>
                <input type="password" id="confirmPassword" placeholder="Confirm password" required onChange={(e) => this.setState({ confirmPassword : e.target.value})}></input>
                { this.state.passwordNotMatched && ( <div style={{color:'red'}} >password did not match</div> )

                }
                </div>
                
                <div style={{height:"60px"}}/>


                

                <div>
                <input type="number" placeholder="Enter Age"  onChange={(e) => this.setState({ age : e.target.value})}></input>
                </div>
                <div>
                <input type="text" placeholder="Enter Country"  onChange={(e) => this.setState({ country : e.target.value})}></input>
                </div>
                <div>
                <input type="text" placeholder="Enter City"  onChange={(e) => this.setState({ city : e.target.value})}></input>
                </div>

               
                <div className="text-center">
                <div>
              <textarea id="description" rows="3" cols="26" type="text"
                placeholder="Enter Bio" onChange={(e) => this.setState({ bio : e.target.value})}
              ></textarea>
            </div>
                </div>








                

                <label />
                
                <div  className='text-center'>
                       <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                        border: '1px solid transparent' }} type="submit"> Sign Up </button>

                </div>
                        
                
                


                        </form>



                <div className='form' style={{maxWidth:'460px' , marginTop:20 , padding:'20px',textAlign:'center',marginBottom:'100px'}}>
                <div> <span>

                Have an account ?{' '}
                        <Link to={`/signin`} style={{color:'#0095f6'}}>
                        Sign In
                        </Link> 
                
                </span>    
                </div>
                </div>


                


    </Slide>
                )
        }
}



export default connect(
        
        (state) => ({ 


                userInfo : state.userSignin.userInfo ,
                registerError : state.userRegister.error ,
                registerLoading : state.userRegister.loading ,
                registerSuccess : state.userRegister.success ,


        
        
        }),
        {
                signin , signout , register
        }

)(RegisterScreen);

