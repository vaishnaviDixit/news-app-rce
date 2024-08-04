import './App.css';
//rerender remounting component using key vid 31
//write rcc enter
import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const pageSize=5;
  const apiKey=process.env.REACT_APP_NEWS_API

  
  const [progress,setProgress]=useState(0)

  

 
    return (
      <div>

        <Router>
        <NavBar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        
      />
        <Routes>

          <Route  path="/" element={<News setProgress={setProgress} apiKey={apiKey}   key="General" pageSize={pageSize} country="in" category="General"/>}/>
          <Route  path="/Business" element={<News setProgress={setProgress}  apiKey={apiKey}  key="Business"pageSize={pageSize} country="in" category="Business"/>}/>
          <Route  path="/Entertainment" element={<News setProgress={setProgress}  apiKey={apiKey}  key="Entertainment" pageSize={pageSize} country="in" category="Entertainment"/>}/>
          <Route  path="/Health" element={<News setProgress={setProgress}  apiKey={apiKey}  key="Health"pageSize={pageSize} country="in" category="Health"/>}/>
          <Route  path="/Science" element={<News setProgress={setProgress}  apiKey={apiKey}  key="Science"pageSize={pageSize} country="in" category="Science"/>}/>
          <Route  path="/Sports" element={<News setProgress={setProgress}   apiKey={apiKey} key="Sports" pageSize={pageSize} country="in" category="Sports"/>}/>
          <Route  path="/Technology" element={<News setProgress={setProgress} apiKey={apiKey}   key="Technology"pageSize={pageSize} country="in" category="Technology"/>}/>


        </Routes>
        </Router>
      </div>
    )
  } 

export default App;
