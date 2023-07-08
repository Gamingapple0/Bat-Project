import './Profile.css'
import { db } from '../config/firebase'
import { doc, getDoc, collection, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'


function Profile(props){
    props.setLocation('/profile')

    var userDoc;
    const userCollection = collection(db, 'users')
    const [userInfo, setUserInfo] = useState({
      age: '',
      height: '',
      weight: '',
      isMale: true
    });
    
    useEffect(() => {
      const getProfile = async () => {
        const userDoc = doc(db, 'users', 'testing@gmail.com');
        try {
          const userProfile = await getDoc(userDoc);
          setUserInfo(userProfile.data());
          console.log("User:", userProfile.data());
        } catch (e) {
          console.error(e);
        }
      };
      getProfile();
    }, []);
    

    const calculations = (isMale, height, weight, age, method)=>{
        switch(method){
          case 'BMR':
            if (isMale){
              return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) * 1.7).toFixed(0)
            } 
            return (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age) * 1.7).toFixed(0)
          case 'BMI':
            const bmi = weight/(height/100) ** 2
            if (bmi < 18.5){
              return 'Underweight'
            }
            else if (bmi >= 18.5 && bmi < 25 ){
              return 'Normal weight'
            }
            else if (bmi >= 25 && bmi < 30){
              return 'Overweight'
            }
            else{
              return 'Obese'  
            }
          case 'Ideal':
            if (isMale) {
              return 50 + ((height - 150) * 0.6);
            } else {
              return 45.5 + ((height - 150) * 0.5);
            }
          case 'Macros':
            const carbCalories = calculations(isMale, height, weight, age, 'BMR') * (20 / 100);
            const proteinCalories = calculations(isMale, height, weight, age, 'BMR') * (35 / 100);
            const fatCalories = calculations(isMale, height, weight, age, 'BMR') * (45 / 100);

            const carbGrams = carbCalories / 4;  // 4 calories per gram of carbohydrates
            const proteinGrams = proteinCalories / 4;  // 4 calories per gram of protein
            const fatGrams = fatCalories / 9;  // 9 calories per gram of fat

            const vals = {
              carbs: carbGrams.toFixed(1),
              protein: proteinGrams.toFixed(1),
              fat: fatGrams.toFixed(1)
            }

            return Object.entries(vals).map(([key, value]) => <li>{key}: {value}</li>); 
          }
        
    }
    
    setInterval(console.log(userInfo),1000)
    
    const updatedProfile = async (id)=>{
      await updateDoc(doc(db,'users','testing@gmail.com'), userInfo)
    }

    return(
        <>
        <div style={{ position: 'relative', position: 'unset !important' }} className="profile-card z-applicable">
  <header>
    <a target="_blank" href="#">
      <img src="http://lorempixel.com/150/150/people/" class="hoverZoomLink"/>
    </a>

      <h1>
            {userInfo.username}
      </h1>
      <div className='profile-details'>
      Age:
      <input type="number" onChange={(e)=>{setUserInfo(
        (prev)=>({
          ...prev,
          age:e.target.value
        })
      )}} value={userInfo.age} name="Age"></input>
      </div>
      <div className='profile-details' >
      Height in cm:
      <input style={{width:"42px"}} type="number" onChange={(e)=>{setUserInfo(
        (prev)=>({
          ...prev,
          height:e.target.value
        })
      )}} value={userInfo.height} name="Height"></input>
      </div>
      <div className='profile-details'>
      Weight in kg:
      <input type="number" onChange={(e)=>{setUserInfo(
        (prev)=>({
          ...prev,
          weight:e.target.value
        })
      )}} value={userInfo.weight} name="Age"></input>
      </div>

      <div className="container">
  <div className="switch">
    <input
      type="radio"
      className="switch-input"
      name="view"
      value={true}
      id="male"
      checked={userInfo.isMale === true}
      onChange={() => {
        setUserInfo((prev) => ({
          ...prev,
          isMale: true
        }));
      }}
    />
    <label htmlFor="male" className="switch-label switch-label-off">
      Male
    </label>
    <input
      type="radio"
      className="switch-input"
      name="view"
      value={false}
      id="female"
      checked={userInfo.isMale === false}
      onChange={() => {
        setUserInfo((prev) => ({
          ...prev,
          isMale: false
        }));
      }}
    />
    <label htmlFor="female" className="switch-label switch-label-on">
      Female
    </label>
    <span className="switch-selection"></span>
  </div>
</div>
      <br></br>
      <br></br>
      <br></br>
      
      <button onClick={updatedProfile} type="button" className="submit-button">
        <span className="submit-button__text">Save Changes</span>
      </button>

  </header>

</div>
{ userInfo.age && <div>
        <div className="profile-properties">
        <h2>Target calories: {calculations(userInfo.isMale,userInfo.height,userInfo.weight,userInfo.age,"BMR")}</h2>
        <h2>BMI: {calculations(userInfo.isMale,userInfo.height,userInfo.weight,userInfo.age,"BMI")}</h2>
        <h2>Ideal Weight: {calculations(userInfo.isMale,userInfo.height,userInfo.weight,userInfo.age,"Ideal")}</h2>
        <h2>Macros: {calculations(userInfo.isMale,userInfo.height,userInfo.weight,userInfo.age,"Macros")}</h2>
        </div>
      </div>}
        </>
    )
}

export default Profile