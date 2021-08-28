import './App.css';
import { useEffect , useState} from 'react';
import Recipe from './Recipie';


const App = () => {

  const APP_ID = "974af929";
  const APP_KEY = "512ec59c51696bc861bda1da07f5b825";
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(()=>{
    getRecipies();
  },[query]);

  const getRecipies = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data =  await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
        className="search-bar" 
        type="text"
        value={search} 
        onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        />
      ))}


    </div>
  );
};

export default App;
