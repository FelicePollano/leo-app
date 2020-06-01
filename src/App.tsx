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
          <PokeList/>
        </Route>
        <Route exact path="/pokemon/:id" render={(rp)=><PokeDetails id={rp.match.params["id"]} ></PokeDetails>}>
          
        </Route>
      </Router>
    </div>
  );
}

export default App;
