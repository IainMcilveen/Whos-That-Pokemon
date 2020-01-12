import React, {useState} from 'react';
import './App.css';

function App() {

  const [pokemon,updatePokemon] = useState([]);
  const [load,updateLoad] = useState(false);

  async function getPokemon(){
    let num = 1;
    let arrayOfPoke = [];
    let response, data;
    
    for(let i = 0; i < 4; i++){
      num = Math.floor(Math.random() * 151) + 1;
      console.log(num);
      response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      if (!response.ok) {
        alert("failed to retrieve pokemon");
        return;
      }
      data = await response.json();
      arrayOfPoke.push(data);
    }

    console.log(arrayOfPoke);
    updatePokemon(arrayOfPoke);

  }

  return (
    <div className="App">
      
      <header className="App-header">
        <h1>Pokemon Name Guesser</h1>
      </header>
      
      {/*if we have enough pokemon*/}
      {pokemon.length === 4 && <body className="App-body">
        <div className="Body-contents">
          <div className="Img">
            <p>img</p>
          </div>
          <div className="Names">

          </div>
        </div>
      </body>}

      {/*get user to request a new quiz*/}
      <body className="App-body">
        <div className="Body-contents">
          <button onClick={() => getPokemon()}>
            New Quiz
          </button>
        </div>
      </body>


    
    </div>
  );
}

export default App;
