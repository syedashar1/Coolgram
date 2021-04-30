import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './screens/Home';
import RegisterScreen from './screens/RegisterScreen';
import signInScreen from './screens/signIn.Screen';
import Navbar from './components/Navbar'
import SellerRegister from './screens/SellerRegister';
import userProfileScreen from './screens/userProfileScreen';
import NewsFeedScreen from './screens/NewsFeedScreen';
import ChatApp from './chat/components/ChatApp'


class App extends React.Component {


  render(){


    return (

      <BrowserRouter>
        <div className="App">

            <Navbar/>
            
            <main>
                <Route path="/register" component={RegisterScreen} exact></Route>
                <Route path="/registerSeller" component={SellerRegister} exact></Route>
                <Route path="/signin" component={signInScreen} exact></Route>
                <Route path="/profile" component={userProfileScreen} exact></Route>
                <Route path="/" component={NewsFeedScreen} exact></Route>
                <Route path="/user/:id" component={userProfileScreen}></Route>
                <Route path="/chat" component={ChatApp}></Route>

                

                

            </main>
            {/* <footer style={{backgroundColor :' #023246' ,color:'#f6f6f6'}} className="row center">All right reserved</footer> */}
        </div>
        </BrowserRouter>






    );

  }


}


export default App;
