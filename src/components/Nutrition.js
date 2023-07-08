import { useEffect, useState } from "react"
import Footer from "./Footer"
import './Nutrition.css'
import { saveAs } from "file-saver";


function Nutrition(props){
  props.setLocation('/nutrition')

const mealCategories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
  'Desert',
]

  const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://keto-diet.p.rapidapi.com/',
  params: {
    protein_in_grams__gt: '7',
    difficulty: 'Medium',

  },
  headers: {
    'X-RapidAPI-Key': '5850476d8emsh243dfd13c4bbbedp1c87c0jsnfac65f5a14b5',
    'X-RapidAPI-Host': 'keto-diet.p.rapidapi.com'
  }
};

const fetchNutrition = async () => {
  document.querySelector('.submit-button').classList.add('submit-button--loading')
  var response
  console.log('Fetch Nutrition Run')
  try {
  response = await axios.request(options);
  setTimeout(()=>{
    document.querySelector('.submit-button').classList.remove('submit-button--loading')
    }, 2000)
    console.log(response.data)
  return response.data
  } catch (error) {
    console.error(error);
  }


};

const cardClicked = (id)=>{
    const card  = document.querySelector("#meal_" + id)
    const meal_info = card.querySelector(':scope > .meal-info')
    if (meal_info.classList.contains('meal-info-animate')){
      meal_info.classList.add('meal-info-animate-reverse')
      meal_info.classList.remove('meal-info-animate')
    }
    else{
      meal_info.classList.remove('meal-info-animate-reverse')
      meal_info.classList.add('meal-info-animate')

    }
}

const getRandomMeal = (meals) =>{
    const randomIndex = Math.floor(Math.random() * meals.length);
    const randMeal = meals[randomIndex];
    return randMeal;
}

const [totalCalories, setTotalCalories] = useState(null)
const [totalCarbs, setTotalCarbs] = useState(0)
const [totalProtein, setTotalProtein] = useState(0)
const [totalFats, setTotalFats] = useState(0)

const cardSelector = (requiredCalories) => {
  console.log('Card Selector Run');

  return new Promise(async (resolve, reject) => {
    try {
      const mealData = await fetchNutrition();

      var dinner = null;
      var breakfast = null;
      var lunch = null;
      var randCount = 0;
      var totalCals = 0;

      const mealRandomizer = () => {
        console.log(mealData);
        breakfast = getRandomMeal(mealData.filter((meal) => meal.category.category == 'Breakfast Recipes'));
        lunch = getRandomMeal(mealData.filter((meal) => meal.category.category != 'Breakfast Recipes' && meal.calories > 500));
        dinner = getRandomMeal(mealData.filter((meal) => meal.category.category != 'Breakfast Recipes' && meal != lunch && meal.calories > 500));
      };

      do {
        console.log('Meal Randomizer Run');
        mealRandomizer();
        totalCals = breakfast.calories + lunch.calories + dinner.calories;
        randCount++;
      } while (
        randCount < 1 ||
        totalCals <= requiredCalories + 200 &&
        totalCals >= requiredCalories - 200
      );
      
      console.log('--------------------------');
      console.log(breakfast);
      console.log(lunch);
      console.log(dinner);
      console.log("Total: " + totalCals);

      console.log('--------------------------');
      
      setTotalCalories(totalCals)
      setTotalFats(breakfast.fat_in_grams + lunch.fat_in_grams + dinner.fat_in_grams)
      setTotalCarbs(breakfast.carbohydrates_in_grams + lunch.carbohydrates_in_grams + dinner.carbohydrates_in_grams)
      setTotalProtein(breakfast.protein_in_grams + lunch.protein_in_grams + dinner.protein_in_grams)

      resolve([breakfast, lunch, dinner]);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
  
  var customMealPlan;

  const [mealPlans, setMealPlans] = useState([])

  const getRandomMeals = () => {
    let catCount = -1;
    const meals = cardSelector(2000).then((mealArray)=>{
    customMealPlan = mealArray.map((data) => {
        catCount++;
        const directions = Object.keys(data)
        .filter(key => key.startsWith('directions_step_'))
        .map(key => <li key={key}>{data[key]}</li>);
        return (
          <div onClick={() => cardClicked(data.id)} >
            <h3>{mealCategories[catCount]}</h3>
            <div  className="meal-card" id={'meal_' + data.id}>
              <div className="meal-card-general">
                <img src={data.image} alt="Meal Image" />
                <h4>{data.recipe}</h4>
              </div>
              <div className="meal-info">
                <div className="meal-info-extra">
                  <div>
                    <h2>Meal Calories: {data.calories}</h2>
                  </div>
                  <ul>
                    {directions}
                  </ul>
                </div>
                <div className="extra-info"></div>
              </div>
            </div>
          </div>
        );
      });
    setMealPlans(customMealPlan)
    }
    )


    
  };
  
return(
    <div>
      <div className="nutrition-container">
          <div className="diet-plan-container">
            <h2 className="title">Your Custom Meal Plan For Today</h2>
            <div className="meal-cards">
              {mealPlans}
            </div>
          </div>
          <div className="submit-button-wrapper">
      <br></br>
      <br></br>
      {totalCalories && <div>
      <h2>
        Total Calories: {totalCalories}
      </h2>
      <h2>
        Total Fat in gms: {totalFats}
      </h2>
      <h2>
        Total Carbs in gm: {totalCarbs}
      </h2>
      <h2>
        Total Protein in gm: {totalProtein}
      </h2>
      </div>}
      <br></br>
      <br></br>
      <br></br>
        <div onClick={getRandomMeals}>
          <button type="button" className="submit-button">
            <span className="submit-button__text">Generate Meal Plan for Today</span>
          </button>
        </div>
          
          <br></br>
      <br></br>
      <br></br>
      <br></br>
          </div>

      </div>

    </div>
)
}

export default Nutrition