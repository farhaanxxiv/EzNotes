import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Upload from './Upload'
import Test from './Test'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


ReactDOM.render(

  // <Router>
  //     <Link to = '/'>Home</Link>
  //     <Link to = '/upload'>Upload</Link>
  //     <Link to = '/test'>Test</Link>



  //     <Switch>
  //       <Route path = '/upload' component={Upload}/>
  //       <Route path = '/test' component = {Test}/>
  //       <Route path = '/*' component={App}/>
  //     </Switch>

  // </Router>
  <App/>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
