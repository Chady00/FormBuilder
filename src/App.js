import "./App.css";
import Form from "./Form";
import Header from "./Header";
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import FormAdder from "./FormAdder";

function App() {
  return (
    <>
      <Router>
        <div className="background">
          <Switch>
            <Route exact path="/">
              <FormAdder />
            </Route>
            <Route path="/form">
              <Form />
            </Route>
            <Route path="/preview">
              <Form hideHeader={true} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
