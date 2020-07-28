import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App =()=>{
  const APP_ID='23d3e3df';
  const APP_KEY='7c546225b6b8dbf52c5241713d7d514c';
 

  const [recipes, setRecipes]=useState([]);

  const [search, setSearch]=useState('');     
  const [query, setQuery]=useState('chicken');
  useEffect( ()=>{
getRecipes();
  }, [query]);
  const getRecipes =async()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  const updateSearch=e=>{
setSearch(e.target.value)
  };

  const getSearch=e=>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
  };
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit" value={search} onChange={updateSearch}>Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe
        key={recipe.recipe.label} 
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  )
}

export default App;
