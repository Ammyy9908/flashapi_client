import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from "./HeaderMobile.module.css"
function HeaderMobile(props) {

   const history = useHistory()
   const moveToProfile = ()=>{
      history.push('/account');
   }

   const moveToReg = ()=>{
      history.push('/auth/reg');
}
const moveToLogin = ()=>{
   history.push('/auth/login');
}
   return (
      <div className={props.isNav?styles.headerMobile__enable:styles.headerMobile}>
         <div className={styles.header__mobile__wrapper}>
            <a href="/">Get Started</a>
            <a href="/">Documentation</a>
            {/* <a href="/">Pricing</a> */}
            <div className={styles.header__buttons}>
               {!props.user && <><button onClick={moveToLogin}>Login</button>
               <button onClick={moveToReg}>Get API Key</button></>}
               {props.user && <button onClick={moveToProfile} className={styles.auth_btn}>{props.user.email}</button>}
            </div>
         </div>
      </div>
   )
}

const mapStateToProps = (state)=>({
   isNav:state.appReducer.isMobileNav,
   user:state.appReducer.user
})
// const mapDispatchToProps =(dispatch) =>({
//    setNav:(nav)=>dispatch(setNav(nav))
// })
export default connect(mapStateToProps,null)(HeaderMobile)
