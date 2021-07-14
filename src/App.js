import { loadReCaptcha } from 'react-recaptcha-google'
import './App.css';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Auth from './pages/Auth';
import React from 'react'
import Cookies from "js-cookie";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import axios from 'axios';
import { setUser } from './redux/actions/_appAction';
import Profile from './pages/Profile';

function App(props) {
  console.log("App user",props)
  React.useEffect(() =>{
    const token = Cookies.get("AUTH_TOKEN");

    async function getUser() {
      try{
          const r = await axios.get('https://apiflash.herokuapp.com/auth/user',{headers:{
              "Authorization":"Bearer " +Cookies.get("AUTH_TOKEN"),
              "Content-Type":"application/json"
          }})

          return r.data;
      }
      catch(e) {
          if(e.response && e.response.data){
              return e.response.data;
          }
      }
}

    if(token) {
      getUser().then((user)=>{
        console.log("User data",user);
        props.setUser(user.user);
      })
    }
  },[])


  return (
    <Router>
  <div>
  
  
  <Switch>
  <Route exact path="/">
    <Home/>
    </Route>
    <Route path="/auth/:type" render={(props) => {
   const type = props.match.params.type;
    return <Auth type={type} />
}}  />
<Route path="/account" render={(props) => {
   
    return <Profile />
}}  />
   
   
  </Switch>
</div>
</Router>
  );
}

const mapDispatchToProps =(dispatch) =>({
  setUser:(user => dispatch(setUser(user)))
})
const mapStateToProps = (state)=>({
  user: state.appReducer.user
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
