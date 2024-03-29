import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './Content';
import Find from './Find';
import Home from './Home.js';
import Login from './Login';
import Lost from './Lost';
import Personal from './Personal.js';
import Post from './Post';
import Register from './Register';
import Report from './Report';
import Setting from './Setting';

function App() {

  // === 新增的程式碼 ===
  // let element = <h1 style={{color:"gold"}}>{"You did a good job!!"}</h1>; //<-- 宣告一個變數，並賦予他html的標籤元素
  // console.log("show element detail:", element) //<-- 印出來看看，你會發現html的資訊被轉譯為 javascript 的object
  // ==================

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={rabbit} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>

    //     {/* 加一段程式碼 */}
    //     {/* <h1 style={{color:"gold"}}>{"You did a good job!!"}</h1> */}
    //     {element}
    //     <img src="logo.png"/>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      {/* <NavBar/> */}
      {/* <Home /> */}
      <div>
        <Routes basename="/">
          <Route path='/' element={<Home />} />
          <Route path='/main' element={<Find />} />
          <Route path='/main/find' element={<Find />} />
          <Route path='/main/lost' element={<Lost />} />
          {/* <Route path='/main' element={<Main />} /> */}
          <Route path='/post' element={<Post />} />
          <Route path='/personal' element={<Personal />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/main/content/:id' element={<Content />} />
          {/* <Route path='/main/lost/content/:id' element={<Content />} /> */}
          <Route path='/main/report' element={<Report />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
