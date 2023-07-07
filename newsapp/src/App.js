import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {

  


/*const state={
 progress:0
 }*/

  /* const setProgress=(progress)=>{
  setprogress(progress)
 this.setState({
    progress:progress
  })
 }*/

  const apiKey=process.env.REACT_APP_NEWS_API
  const[progress,setProgress]= useState(0);
    return (
      <div>
        <BrowserRouter>
        <NavBar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
        <Routes>
          <Route  exact path='/general' element={ <News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={5} country="in" category="general"  />}></Route>
          <Route exact path='/business' element={ <News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={5} country="in"  category="business" />}></Route>
          <Route exact path='/entertainment' element={ <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={5} country="in"  category="entertainment" />}></Route>
          <Route exact path='/science' element={ <News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={5} country="in"  category="science" />}></Route>
          <Route exact path='/technology' element={ <News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={5} country="in"  category="technology" />}></Route>
          <Route  exact path='/health' element={ <News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={5} country="in"  category="health" />}></Route>
          <Route  exact path='/sports' element={ <News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={5} country="in"  category="sports" />}></Route>
       
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
export default App;
