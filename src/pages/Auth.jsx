import React from 'react'
import "./Auth.css"
import {FiArrowLeft} from "react-icons/fi"
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from "js-cookie";
function Auth({type}) {
   const history = useHistory();
   const [email,setEmail] = React.useState('');
   const [password,setPassword] = React.useState('');

   const [isRobot,setRobot] = React.useState(false);
   const [role,setRole] = React.useState('Student');

   const [errors,setErrors] = React.useState(null);

   function onChange(value) {
      
      setRobot(value);
    }

    console.log(role,errors);

    const handleReg = async (e) =>{
      e.preventDefault();
      if(email && password){
         try{
            const r = await axios.post(`https://apiflash.herokuapp.com/auth/reg`,{email,password,robot:isRobot,role});
           
            if(r.data.errors){
               setErrors(r.data.errors);
            }
            else{
               history.push("/auth/login");
            }
            
            
         }
         catch(e){
            
            if(e.response && e.response.data){
               console.log(e.response.data);
               setErrors(e.response.data.error)
            }
         }
      }

    }


    const handleLogin = async (e) =>{
      e.preventDefault();
      if(email && password){
         try{
            const r = await axios.post(`https://apiflash.herokuapp.com/auth/login`,{email,password});
            console.log(r)
            if(r.data.error){
               console.log(r);
               setErrors(r.data.error);
               setTimeout(()=>{
                  setErrors(null)
               },3000)
            }
            else{
               console.log(r);
               const {token} = r.data;
               Cookies.set("AUTH_TOKEN",token);
               window.location.href="/";
               
            }
            
         }
         catch(e){
            
            if(e.response && e.response.data){
               console.log(e.response.data);
               setErrors(e.response.data.error)
            }
         }
      }

    }

    
    const moveToHome = ()=>{
      history.push('/')
    }
   return (
      <div className="auth">
         <header>
            <button onClick={moveToHome}><FiArrowLeft/> Back to home</button>
         </header>

         <div className="auth__container">
            <h1>{type==="reg"?"Register for API Key":"Login"}</h1>
            {errors && <div className="validation__container">
            {errors}
            </div>}
            <form method="POST" onSubmit={type==="reg"?handleReg:handleLogin}>
               <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="text" className="form-control"  id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
               </div>
               <div className="form-group">
                  <label htmlFor="password">{type==="reg"?"Choose a":"password"} </label>
                  <input type="text" className="form-control"  id="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
               </div>
              { type==="reg" && <div class="radio-group">
            <div class="radio">
                <label>
                    <input checked="checked" class="entityTypeRadioBtn" data-val="true" data-val-required="The EntityType field is required." id="EntityTypeIndividual" name="EntityType" type="radio" value="Student" onChange={(e)=>setRole(e.target.value)}/> I am an individual 👤
                </label>
            </div>
            <div class="radio">
                <label>
                    <input class="entityTypeRadioBtn" id="EntityTypeBusiness" name="EntityType" type="radio" value="Developer" onChange={(e)=>setRole(e.target.value)}/> I am a business, or am working on behalf of a business 🏢
                </label>
            </div>
        </div>}
             
               {type==="reg" && <ReCAPTCHA
               style={{marginBottom:"10px",marginTop:"10px"}}
    sitekey="6LdbwZUbAAAAAPfhiDw8pYR5PqA3lLLrclyCQJeR"
    onChange={onChange}
  />
 }
        <button type="submit" className={!email || !password ? "submit-btn":"btn__enable"}>Submit</button>
            </form>
         </div>
      </div>
   )
}

export default Auth
