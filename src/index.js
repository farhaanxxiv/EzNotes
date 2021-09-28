import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import About from './About'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


ReactDOM.render(
  <div>
  <header>

  <h1>EzNotes</h1>
</header>
  <Router>
   

    <div className='navbar'>
      <Link to = '/'>Home</Link>
      <Link to = '/about'>About</Link>
      </div>


      <Switch>
        <Route path = '/about' component={About}/>
        <Route path = '/*' component={App}/>
      </Switch>

  </Router>
  </div>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
