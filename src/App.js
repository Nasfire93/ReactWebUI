
import Login from "./Components/LoginComponent.js";
import ItemsTable from "./Components/ItemsTableComponents.js";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <Login/>
      </Route>
      <Route path="/table">
            <ItemsTable/>
          </Route>
    </Switch>
    </Router>
    
  )
}


export default App;
