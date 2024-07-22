import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Getting started

        </p>
        <button
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(()=>{
            fetch('http://localhost:8080/hit_db', {
              method: 'post',
              mode: 'no-cors', //i intsalled cors so I may not need this
            }).then((data)=>{
              console.log(data, data.body)
            }).catch((e)=>{
              console.log(e)
            })
          })}
        >
          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;
