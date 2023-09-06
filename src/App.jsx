import React from 'react'
import Recipe from './components/Recipe.jsx'
import Title from './components/Title.jsx'
import './App.css'

export default function App() {
  const APP_ID='5ccf5201' // Application ID to send with each API request
  const APP_KEY='2c28a99ea231103383c270fd3e017b65' // Application key used to authenticate requests

  // State variables
  const [recipes, setRecipes] = React.useState([]) // Store array of recipes from API
  const [search, setSearch] = React.useState("") // Store user input for search
  const [query, setQuery] = React.useState("tomato") // Query used when we press search; by default we will use 'tomato'

  // Side effect
  // Runs when component first loads and then every time our dependencies array (query) changes
  React.useEffect(() => {
    getRecipes()
  }, [query])

  // Defining an asynchronous function using the 'async' keyword, meaning that it can use 'await' to pause
  // execution of function until the asynchronous operations are complete 
  const getRecipes = async () => {
    // The query value represents what we are searching for, while the parameters for the query are APP_ID and APP_KEY
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    // After sending the request, the function waits for a response using 'await response.json()'
    const data = await response.json()
    // The JSON data aquired from the API is then stored in the state variable called 'recipes' using 'setRecipes'
    setRecipes(data.hits)
  }

  // Takes an event object 'e' as its argument, which represents the chagne event caused by the user typing into the input field
  const updateSearch = (e) => {
    // Then it extracts the value of the input in 'e.target.value' and sets that value to our 'search' state variable
    setSearch(e.target.value)
  }

  // Function that calls when user submits the search form
  // Takes event object 'e' as its argument, which represents the form submit event 
  const getSearch = (e) => {
    e.preventDefault() // Used to prevent the page from reloading when we press submit
    setRecipes([]) // Clears previous search results
    setQuery(search) 
    setSearch("")
  }

  return (
    <>
      <Title />
      <div className="search">
        <form onSubmit={getSearch}>
          <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Search for Recipe" />
          <button class="search-button" type="submit">Search</button>
        </form>
      </div>
      <section>
        {recipes.map(recipe => ( // Generates content based on the recipes array
          <Recipe // Pass state variable 'recipes' as prop to use and display data
            key={recipe.recipe.label} // Key used to provide a unique identifier and to prevent an error
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </section>
    </>
  )
}