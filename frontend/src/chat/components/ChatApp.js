import React, { Component } from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import { useDispatch, useSelector } from 'react-redux';
import { avaliableForChat } from '../../actions/chatActions';
import { useEffect } from 'react';
import { connect } from "react-redux";
import Axios from 'axios';


// function App(props) {
//   // const [id, setId] = useLocalStorage('id')
//   const userSignin = useSelector((state) => state.userSignin);
//   const {  userInfo : userInfo } = userSignin;
//   useEffect(() => {  
//     if (!userInfo._id) {  props.history.push('/');


  
//   }}) 
//   const dashboard = (
//     <SocketProvider id={userInfo._id }>
//       <ContactsProvider>
//         <ConversationsProvider id={userInfo._id}>
//           <Dashboard id={userInfo._id} />
//         </ConversationsProvider>
//       </ContactsProvider>
//     </SocketProvider>
//   )

//   return (
//     dashboard
//   )
// }

// export default App;






class App extends Component {


  constructor(){
    super();
    this.state = {
      convPresent : false
    }
  }

  componentDidMount = async () => {
    
    localStorage.removeItem('whatsapp-clone-conversations');

    this.props.avaliableForChat()


    if( JSON.parse(localStorage.getItem('whatsapp-clone-conversations')) === [] || !localStorage.getItem('whatsapp-clone-conversations')) {
      console.log('nothing present in it');
      const { data } = await Axios.get(`/api/chat/getconversations/${this.props.userInfo._id}`);
      console.log(data);
      localStorage.setItem('whatsapp-clone-conversations', JSON.stringify(data));
      this.setState({convPresent : true})
      // alert('new chat updated')

    }
    else {
      this.setState({convPresent : true})
    }

                

  }


  render() {
    const conv = JSON.parse(localStorage.getItem('whatsapp-clone-conversations'))
    if (!this.props.userInfo) { this.props.history.push('/') }
    const {userInfo} = this.props
    const dashboard = (
      <SocketProvider id={userInfo._id }>
        <ContactsProvider>
          <ConversationsProvider id={userInfo._id}>
            <Dashboard id={userInfo._id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    )
    
    

    return (
      this.props.users && this.state.convPresent ? dashboard : 
      <div className='row center upgap' > <div className='cm-spinner' ></div> </div>
    )
  }
}
export default connect(
        
  (state) => ({ 
          users : state.ListForChat.users , 
          loading : state.ListForChat.loading , 
          error : state.ListForChat.error , 

          userInfo : state.userSignin.userInfo ,


  
  }),
  {
          avaliableForChat
  } 

)(App);

