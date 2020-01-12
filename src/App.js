import React, {useState} from 'react';
import './App.css';

function App() {

  const [quiz,updateQuiz] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Quiz</h1>
      </header>
      <body className="App-body">
        <p>body</p>
      </body>
    </div>
  );
}

export default App;
