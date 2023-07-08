import './Signup.css'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth, db } from '../config/firebase'
import { setDoc, doc, collection } from 'firebase/firestore'
import useNavigate from 'react-router-dom'
import Footer from './Footer'


function Signup(props){
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState(null)

  const userCollection = collection(db, 'users')

    const addUserData = async ()=>{
      try{

        await setDoc(doc(db, "users", email),{
          age:'',
          height:'',
          weight:'',
          isMale:true
        })
      }
      catch(e){
        console.error(e)
      }
    }


    const signUp = async ()=>{
      console.log(errorMessage)
      try{
        if (password != confirmPassword){
          setErrorMessage("Password is not equal to confirm password")
        }
        else if (password == '' || confirmPassword == '' || email == ''){
          setErrorMessage("Email or Password field empty")
        }
        else if(password.length < 6){
          setErrorMessage('Password needs to be at least 6 letter long')
          console.log(password)
        }
          if (errorMessage){
            document.querySelector('.password-error').classList.add('error-animate-down')
            setTimeout(()=>{
              document.querySelector('.password-error').classList.add('error-animate-up')
            }, 800)
            setTimeout(()=>{
              document.querySelector('.password-error').classList.remove('error-animate-down')
              document.querySelector('.password-error').classList.remove('error-animate-up')
            },1500)
            return;
          }
          await createUserWithEmailAndPassword(auth, email, password)
          await addUserData()
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

    props.setLocation('/signup')

    return(
      <div>
        <div className="password-error">
            Error: {errorMessage}
        </div>
      <div className="form-container slidefade animate-slidefade z-applicable">
      <h3 className="title">Sign Up</h3>
      <form action="">
          {/* <input type="number" placeholder='Height in cm'/>
          <input type="number" placeholder='Weight in kg'/>
          <div>
        <input type="radio" value="MALE" name="gender"/> Male
        <input type="radio" value="FEMALE" name="gender"/> Female
      </div> */}
          <input type="email" placeholder="Email" name="" id="" onChange={(e)=>setEmail(e.target.value)}/> 
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <input type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
          <br></br>
          <button className="form-button" type="button" onClick={signUp} name="Hover">Sign-Up</button>
       </form>
    </div>
    <br></br>
    <br></br>
    <br></br>
      </div>
    )
  }
  
  export default Signup