import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";

function AppPresentation({ hello }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Hello {hello}!</p>
      </header>
    </div>
  );
}

const App = connect((state) => ({ hello: state.hello }))(AppPresentation);

export default App;
