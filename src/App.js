import React, {useState} from 'react';
import './App.css';

function App() {

  const [pokemon,updatePokemon] = useState([]);
  const [correct,updateCorrect] = useState(null);
  const [load,updateLoad] = useState(false);  
  const [ans, ansUpdate] = useState(null);
  const [fin, updateFin] = useState(true);
  
  async function getPokemon(){
    
    ansUpdate(null);
    updateCorrect(null);
    updateLoad(true);
    updatePokemon([]);
    updateFin(false);

    let num = 1;
    let arrayOfPoke = [];
    let response, data;

    updateCorrect(Math.floor(Math.random()*4));
    
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
    updateLoad(false);
    updatePokemon(arrayOfPoke);

  }

  return (
    <div className="App">
      
      <header className="App-header">
        <h1>Who's That Pokemon!</h1>
      </header>
      
      {/*if we have enough pokemon*/}
      {ans === null && pokemon.length === 4 && <body className="App-body">
        <div className="Body-contents">
          <div className="Img">
            <img className="Hidden-img" src={pokemon[correct].sprites.front_default} alt="xd" />
          </div>
          <div className="Names">
            <button onClick={() => ansUpdate(0)}>{pokemon[0].name}</button>
            <button onClick={() => ansUpdate(1)}>{pokemon[1].name}</button>
            <button onClick={() => ansUpdate(2)}>{pokemon[2].name}</button>
            <button onClick={() => ansUpdate(3)}>{pokemon[3].name}</button>
          </div>
        </div>
      </body>}

      {/*loading pokemon*/}
      {load && <body className="App-body">
        
        <div className="Body-contents">
          <div className="load">
            <h3>Loading Pokemon</h3>
          </div>
        </div>
      </body>}

      {/*get user to request a new quiz*/}
      {!load && <body className="App-body">
        
        {/* They guessed correctly */}
        {console.log(ans)}
        {console.log(correct)}
        {ans === correct && ans !== null && <div className="Answer-div">
          <img className="Shown-img" src={pokemon[correct].sprites.front_default} alt="xd" />
          <h2>Correct!</h2>
          <p>{pokemon[correct].name} was the correct pokemon</p>
        </div>}
        {/* They guessed incorrectly */}
        {ans !== correct && ans !== null && <div className="Answer-div">
          <img className="Shown-img" src={pokemon[correct].sprites.front_default} alt="xd" />
          <h2>Wrong!</h2>
          <p>{pokemon[correct].name} was the correct pokemon</p>
        </div>}
        
        {/* if the quiz has been answered, give the option to reset */}
        {fin && <div className="Body-contents">
          <button onClick={() => getPokemon()}>
            New Quiz
          </button>
        </div>}

      </body>}


    
    </div>
  );
}

export default App;
