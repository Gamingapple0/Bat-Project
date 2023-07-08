import './Signin.css'
import {signInWithEmailAndPassword} from 'firebase/auth'
import React from 'react'
import { auth } from '../config/firebase'
import Footer from './Footer'



function Signin(props){
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState(null)


    const FirebaseSignIn = async ()=>{
        try{
          await signInWithEmailAndPassword(auth, email, password)
          window.location.href="/"
        }
        catch(e){
            setErrorMessage(e.message)
            document.querySelector('.password-error').classList.add('error-animate-down')
            setTimeout(()=>{
              document.querySelector('.password-error').classList.add('error-animate-up')
            }, 800)
            setTimeout(()=>{
              document.querySelector('.password-error').classList.remove('error-animate-down')
              document.querySelector('.password-error').classList.remove('error-animate-up')
            },1500)
          }
        }


    props.setLocation('/signin')

    return(
        <div>
                <div className="form-container slidefade animate-slidefade z-applicable">
                <div className="password-error">
            Error: {errorMessage}
        </div>
      <h3 className="title">Sign In</h3>
      <form action="">
          <input type="email" placeholder="Email" name="" id="" onChange={(e)=>setEmail(e.target.value)}/> 
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <br></br>
          <button className="form-button" type="button" onClick={FirebaseSignIn} name="Hover">Sign-In</button>
       </form>
    </div>
    <br></br>
    <br></br>
    <br></br>
        </div>
    )
  }
  
  export default Signin