import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import github from './GitHub-Mark-Light-32px.png';
import './App.css';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import {PokeList} from "./components/pokelist"
import {PokeDetails} from "./components/pokedetails"


function App() {

  useEffect(()=>{

  },[]);


  return (
    <div className="App">
      
      <Router basename="/leo-app">
        <Route exact path={["/","/pokemon","/pokemon/page/:page"]}>
        <div className="pokename">Pokemon Browser</div>
          <PokeList/>
        </Route>
        <Route exact path="/pokemon/:id" render={(rp)=><PokeDetails id={rp.match.params["id"]} ></PokeDetails>}>
          
        </Route>
      </Router>
      <div className="pokefooter">Created in may 2020, by Leo and Felice Pollano. Learning by teaching React :) <a href="https://github.com/FelicePollano/leo-app"><img className="github-icon" src={github}></img></a></div>
     
    </div>
  );
}

export default App;
