import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HelloWorld from "./HelloWorld" //<-- 引入我們的HelloWorld component
import { BrowserRouter } from "react-router-dom";
import Home from './Home.js';
import Personal from './Personal.js';
import Login from './Login';
import Content from './Content';
import { Register } from './Register';
import Report from './Report';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <Report/> */}
      {/* <Content /> */}
      {/* <Personal/> */}
      {/* <Home /> */}
      {/* {<Register/>} */}
      {/* {<Login/>} */}
    </BrowserRouter>
  </React.StrictMode>
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
