import "./App.css";
import { connect } from "react-redux";

function AppPresentation() {
  return <div className="App"></div>;
}

const App = connect((state) => state)(AppPresentation);

export default App;
