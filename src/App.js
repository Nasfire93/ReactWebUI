
import Login from "./Components/LoginComponent.js";
import ItemsTable from "./Components/ItemsTableComponents.js";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";


// function App() {

//   return (
//     <Router>
//     <Switch>
//       <Route exact path="/">
//         <Login/>
//       </Route>
//       <Route path="/table">
//             <ItemsTable/>
//           </Route>
//     </Switch>
//     </Router>
    
//   )
// }

function App() {
  return (
    <Router>
    <Switch>
    {


          ((localStorage.length > 0 ) && (JSON.parse(localStorage.user).roles.includes("ROLE_ADMIN") || JSON.parse(localStorage.user).roles.includes("ROLE_USER")) ) ?
            <>
          <Route path="/" exact component={Login} />
          <Route path="/table" exact component={ItemsTable} />
            </> 
            : 
          <Route path="/" exact component={Login} />

}

    </Switch>
    </Router>
    
  )
}

export default App;


// function App() {
//   const permises = JSON.parse(localStorage.user)
//   return (
//     <Router>
//     <Switch>
//     {
//           (JSON.parse(localStorage.user).roles.includes("ROLE_ADMIN") || JSON.parse(localStorage.user).roles.includes("ROLE_USER") ) ?
//             <>
//           <Route path="/" exact component={Login} />
//           <Route path="/table" exact component={ItemsTable} />
//             </> 
//             : 
//           <Route path="/" exact component={Login} />
//         }
//     </Switch>
//     </Router>
    
//   )
// }