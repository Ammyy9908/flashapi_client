import React from 'react'
import styles from "./Header.module.css"
import {FiMenu} from "react-icons/fi"
import { connect } from 'react-redux'
import { setNav } from '../../redux/actions/_appAction'
import { useHistory } from 'react-router-dom'
function Header(props) {

   const history = useHistory()
   const moveToReg = ()=>{
         history.push('/auth/reg');
   }
   const moveToLogin = ()=>{
      history.push('/auth/login');
}

const moveToProfile = ()=>{
   history.push('/account');
}
   return (
      <div className={styles.header}>
         <div className={styles.header__wrapper}>
            <div className={styles.api__logo}>
               <span>Flash Api</span>
            </div>
            <nav className={styles.nav}>
               <div className={styles.nav__link}>Get Started</div>
               <div className={styles.nav__link}>Documentation</div>
               {/* <div className="nav__link">Pricing</div> */}
            </nav>
            <nav className={styles.right__nav}>
               {!props.user&&<><button onClick={moveToLogin} className={styles.non_auth_btn1}>Login</button>
               <button onClick={moveToReg} className={styles.non_auth_btn2}>Get API Key</button></>}
               {props.user && <button className={styles.auth_btn} onClick={moveToProfile}>{props.user.email}</button>}
            </nav>
            <button className={styles.hamburger} onClick={()=>props.setNav(!props.isNav)}><FiMenu/></button>
         </div>
      </div>
   )
}

const mapStateToProps = (state)=>({
   isNav:state.appReducer.isMobileNav,
   user:state.appReducer.user
})
const mapDispatchToProps =(dispatch) =>({
   setNav:(nav)=>dispatch(setNav(nav))
})
export default connect(mapStateToProps,mapDispatchToProps)(Header)
