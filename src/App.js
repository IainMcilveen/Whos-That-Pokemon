import React, {useState} from 'react';
import './App.scss';
import pokeball from './img/pokeball.png'

function App() {

  //hooks
  const [started,updateStarted] = useState(false);
  const [pokemon,updatePokemon] = useState([]);
  const [correct,updateCorrect] = useState(5);
  const [load,updateLoad] = useState(false);  
  const [ans, ansUpdate] = useState(null);
  
  async function getPokemon(){
    
    //reset all of the states back to default, and starts loading state
    updateStarted(true);
    ansUpdate(null);
    updateCorrect(null);
    updateLoad(true);
    updatePokemon([]);

    //initial variables
    let num = 1;
    let arrayOfPoke = [];
    let response, data;

    //pick the pokemon to be the correct answer
    updateCorrect(Math.floor(Math.random()*4));
    
    //get 4 random pokemon
    for(let i = 0; i < 4; i++){
      num = Math.floor(Math.random() * 151) + 1;
     
      response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      if (!response.ok) {
        alert("failed to retrieve pokemon");
        return;
      }
      
      data = await response.json();
      arrayOfPoke.push(data);
    }

    //end loading state, update array of pokemon
    updateLoad(false);
    updatePokemon(arrayOfPoke);

  }

  return (
    <div className="App">
      
      {/*render the header*/}
      <header className="App-header">
        <img className="Pokeball" src={pokeball} alt="ball" />
        <h1>Who's That Pokemon!</h1>
        <img className="Pokeball" src={pokeball} alt="ball" />
      </header>
      
      {/*if we have enough pokemon*/}
      {ans === null && pokemon.length === 4 && <div className="App-body">
        <div className="Body-contents">
          <div className="Img">
            <img className="Hidden-img" src={pokemon[correct].sprites.front_default} alt="xd" />
          </div>
          <div className="Names">
            <div className="Buttons-div"><button onClick={() => ansUpdate(0)}>{pokemon[0].name.charAt(0).toUpperCase()+pokemon[0].name.slice(1)}</button></div>
            <div className="Buttons-div"><button onClick={() => ansUpdate(1)}>{pokemon[1].name.charAt(0).toUpperCase()+pokemon[1].name.slice(1)}</button></div>
            <div className="Buttons-div"><button onClick={() => ansUpdate(2)}>{pokemon[2].name.charAt(0).toUpperCase()+pokemon[2].name.slice(1)}</button></div>
            <div className="Buttons-div"><button onClick={() => ansUpdate(3)}>{pokemon[3].name.charAt(0).toUpperCase()+pokemon[3].name.slice(1)}</button></div>
          </div>
        </div>
      </div>}

      {/*loading pokemon*/}
      {load && <div className="App-body">
        
        <div className="Body-contents">
          <div className="load">
            <h3>Loading Pokemon</h3>
          </div>
        </div>
      </div>}

      {/*get user to request a new quiz*/}
      {!load && (!started || ans !== null) && <div className="App-body">
        
        {/* They guessed correctly */}
        {ans === correct && ans !== null && <div className="Answer-div">
          <img className="Shown-img" src={pokemon[correct].sprites.front_default} alt="xd" />
          <h2>Correct!</h2>
          <p>{pokemon[correct].name.charAt(0).toUpperCase()+pokemon[correct].name.slice(1)} was the correct pokemon</p>
          <div className="Button-div">
            <button onClick={() => getPokemon()}>
              New Quiz
            </button>
          </div>
        </div>}

        {/* They guessed incorrectly */}
        {ans !== correct && ans !== null && <div className="Answer-div">
          <img className="Shown-img" src={pokemon[correct].sprites.front_default} alt="xd" />
          <h2>Wrong!</h2>
          <p>{pokemon[correct].name.charAt(0).toUpperCase()+pokemon[correct].name.slice(1)} was the correct pokemon</p>
          <p>you guessed it was {pokemon[ans].name.charAt(0).toUpperCase()+pokemon[ans].name.slice(1)}</p>
          <div className="Button-div">
            <button onClick={() => getPokemon()}>
              New Quiz
            </button>
          </div>
        </div>}
        
        {/* if the quiz has been answered, give the option to reset */}
        {!started && <div className="Body-contents">
          <button onClick={() => getPokemon()}>
            New Quiz
          </button>
        </div>}

      </div>}

    </div>
  );
}

export default App;