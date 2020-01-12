import React, {useState} from 'react';
import './App.css';

function App() {

  const [pokemon,updatePokemon] = useState([]);

  return (
    <div className="App">
      
      <header className="App-header">
        <h1>Pokemon Name Guesser</h1>
      </header>
      
      <body className="App-body">
        <div className="Body-contents">
          <div className="Img">

          </div>
          <div className="Names">
            
          </div>
        </div>
      </body>
    
    </div>
  );
}

export default App;
