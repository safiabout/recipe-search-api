import React from "react"
import style from './recipe.module.css' // Using the '.module.css' file extension so the class names defined here don't 
// collide with other class names in other parts of the code 

const Recipe = ({title, calories, image, ingredients}) => { // Function accepts several props we need to display data
  // Use a Set to store unique ingredients and prevent repeats
  const uniqueIngredients = [...new Set(ingredients.map(item => item.text))]

  return (
    <div className={style.recipe}>
      <h1 className={style.title}>{title}</h1>
      <ul>
        {uniqueIngredients.map((item, index) => ( // Mapping uniqueIngredients to output ingredients as an unordered list 
          <li key={index}>{item}</li> // 'index' of the current 'item' acts as the unique identifier
        ))}
      </ul>
      <p className={style.calories}>Calories: {calories.toFixed()}g</p>
      <img className={style.image} src={image} alt=""/>
    </div>
  )
}

export default Recipe;