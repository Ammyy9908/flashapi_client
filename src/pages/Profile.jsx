import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import {FiArrowLeft} from "react-icons/fi"
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setUser } from '../redux/actions/_appAction'
import "./Profile.css"
function Profile(props) {
   const history = useHistory()
   //check is user authenticated or not if not move to homepage

   React.useEffect(() => {
      const token = Cookies.get("AUTH_TOKEN");
      if(!token){
         return history.push("/");
      }
   },
   // eslint-disable-next-line
   [])
   
   const [errors,setErrors] = React.useState(null);
   const [success,setSuccess] = React.useState(null)
   const moveToHome = ()=>{
      window.location.href="/"
    }


    const [email,setEmail] = React.useState(props.user && props.user.email);

    const updateEmail = async ()=>{
       try{
          const r = await axios.put(`https://apiflash.herokuapp.com/auth/update/email/${props.user._id}`,{email});
          if(r.status===200){
             console.log(r.data.message);
             setSuccess(r.data.message);
          }
       }
       catch(e){
          if(e.response && e.response.data){
             console.log(e.response.data)
             setErrors(e.response.data)

             setTimeout(()=>{
                setErrors(null)
             },3000)
          }
       }
    }


    const closeSuccess = ()=>{
       setSuccess(null);
    }
    const handleLogout = ()=>{
      Cookies.remove("AUTH_TOKEN");
      props.setUser(null);
      history.push("/");
    }

    console.log(success);
    // eslint-disable-next-line
   return (
      <div className="profile">
          <header>
            <button onClick={moveToHome}><FiArrowLeft/> Back to home</button>
            <button className="logout_btn" onClick={handleLogout}>Logout</button>
         </header>
         <div className="profile__container">
            {success && <div className="success__container">
               
               <button onClick={closeSuccess}>x</button>
               <span className="success__message">
                  {success}
               </span>
            </div>}
            <h1>Account</h1>
            {errors && <div className="validation__container">
            {errors.message}
            </div>}

           
               <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="text" className="form-control"  id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
               </div>
               <div className="form-group">
                  <button className="form-control-btn" onClick={updateEmail}>Update email address</button>
               </div>
               <div className="form-group">
                  <label htmlFor="password">Password </label>
                  <button className="form-control-btn">Change Password</button>
               </div>
               <div className="form-group">
                  <label htmlFor="email">API Key</label>
                  <input type="text" className="form-control_small"  id="email" placeholder="Email" value={props.user && props.user.apiKey}/>
               </div>
               <div className="form-group__flex">
                  <label htmlFor="subscription">Subscription</label>
                     <span>Plan:{props.user.subscription.type}</span>
                     <div className="plan__info mt-5">
                        <span>You {props.user.subscription.type.toLowerCase()==="student".toLowerCase()?'should':'can'} {props.user.subscription.type.toLowerCase()==="student" && "only"} request {props.user.subscription.type==="student"?"50":"150"} request per day if your plan is {props.user.subscription.type.toLowerCase()==="developer".toLowerCase()?"developer":"student"}</span>
                        {props.user.subscription.type.toLowerCase()==="student" && <span>You can switch to developer account if you want to increase request limit to 150 request per day</span>}
                     </div>
               </div>
             
             
              
        <button type="button" className={"submit-btn-large"}>Manage Subscription</button>
           

         </div>
      </div>
   )
}


const mapStateToProps = (state)=>({
   isNav:state.appReducer.isMobileNav,
   user:state.appReducer.user
})
const mapDispatchToProps =(dispatch) =>({
   // setNav:(nav)=>dispatch(setNav(nav))
   setUser:(user)=>dispatch(setUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(Profile)
