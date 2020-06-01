import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import {PokeList} from "./components/pokelist"
import {PokeDetails} from "./components/pokedetails"


function App() {

  useEffect(()=>{

  },[]);


  return (
    <div className="App">
      
      <Router>
        <Route exact path={["/","/pokemon","/pokemon/page/:page"]}>
        <div className="pokename">Pokemon Browser</div>
          <PokeList/>
        </Route>
        <Route exact path="/pokemon/:id" render={(rp)=><PokeDetails id={rp.match.params["id"]} ></PokeDetails>}>
          
        </Route>
      </Router>
      <div className="pokefooter">Created in may 2020, by Leo and Felice Pollano. Learning by teaching React :)</div>
     
    </div>
  );
}

export default App;
