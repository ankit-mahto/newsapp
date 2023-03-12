// import logo from './logo.svg';
import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import Navbar from './components/Navbar.js';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {

 state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  apiKey = "3158d6c76dbe4e33b5ae04e165c143b6"
  // apiKey = process.env.REACT_APP_API_KEY

  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress} waitingTime='500'
      />
          <Routes>
          <Route exact path="/" element ={< News setProgress={this.setProgress} apiKey={this.apiKey} key ='general' pageSize={6} category = 'general' />}/>
          <Route exact path="/business" element ={< News setProgress={this.setProgress} apiKey={this.apiKey} key ='business' pageSize={5} category = 'business' />}/> 
          <Route exact path="/entertainment" element ={< News setProgress={this.setProgress} apiKey={this.apiKey} key ='general' pageSize={5} category = 'entertainment' />}/>
          <Route exact path="/sports" element ={< News setProgress={this.setProgress} apiKey={this.apiKey} key ='sports' pageSize={5} category = 'sports' />}/> 
          <Route exact path="/health" element ={< News setProgress={this.setProgress} apiKey={this.apiKey}  key ='health' pageSize={5} category = 'health' />}/> 
          <Route exact path="/science" element ={< News setProgress={this.setProgress} apiKey={this.apiKey} key ='science' pageSize={5} category = 'science' />}/>
          <Route exact path="/technology" element ={< News setProgress={this.setProgress} apiKey={this.apiKey} key ='technology' pageSize={5} category = 'technology' />}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
