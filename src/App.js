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
        <Button id="hello">Hello {hello}!</Button>
      </header>
    </div>
  );
}

const ButtonPresentation = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

const Button = connect(
  (state) => state,
  (dispatch, { id }) => ({
    onClick() {
      dispatch({ type: "BUTTON_CLICKED", context: { id } });
    },
  })
)(ButtonPresentation);

const App = connect((state) => ({ hello: state.hello }))(AppPresentation);

export default App;
