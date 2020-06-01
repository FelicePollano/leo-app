import React,{useState,useEffect} from 'react';

import { useHistory,useParams,useLocation } from 'react-router-dom';
import {Pager} from './pager';





export const PokeList:React.FC = ()=>{
  
    const history = useHistory();
    const location = useLocation();
    const [pokemons,setPokemons] = useState<any[]>();
    const [pageCount,setPagecount] = useState<number>(0);
    
    let currentId:number|undefined;
    if(location.search.startsWith("?id=")){
        currentId = parseInt(location.search.substring(4));
    }

    const [pokeid,setPokeid] = useState<Number>(currentId??0);
   
    let {page} = useParams();
    
    



    const fethcData=(page:String)=>{
        fetch("/pokemon?"+page).then(data=>data.json())
        .then(l=>{
            var next:string;
            var prev:string;
            setPokemons(l.results);
            next = l.next;
            prev=l.previous;
            
            setPagecount(Math.round(l.count/20));
        });
    }
    const selectPokemon=(uri:String)=>{
       
       let chunks = uri.split("/");
       let id = parseInt(chunks[chunks.length-2]);
       setPokeid(id);
      
    }
    const isActive=(uri:String):boolean=>{
       
        let chunks = uri.split("/");
        let id = parseInt(chunks[chunks.length-2]);
        return id === pokeid;
       
     }
    const navigateTo=(uri:String)=>{
        var chunks = uri.split("/");
        let id = parseInt(chunks[chunks.length-2]);
        location.search="?id="+id;
        history.push(location); // push a convenient way to come back to the selected pokemon
        history.push("/pokemon/"+id);
       
     }
    useEffect(()=>{
        let offset="";
       
        if(page)
        {
            offset="offset="+20*page+"&limit=20"
        }
        
        fethcData(offset);
    },[page]);
   return <div >
       <div className="pokelist">
       <ul>{pokemons?.map((u,i)=><li className={isActive(u.url)?"pokelist-selected":""} onClick={()=>navigateTo(u.url)} onMouseEnter={()=>selectPokemon(u.url)} key={i}>{u.name}</li>)}</ul>
       </div>
       <div className="pokeimage-container">
           <img className="pokeimage" src={"https://pokeres.bastionbot.org/images/pokemon/"+pokeid+".png"}></img>
      </div>
    <div className="pager-container">  
        <Pager pageCount={pageCount} pageSelected={page} onPageSelected={(p)=>history.push("/pokemon/page/"+p)}></Pager>
   </div> 
   
   </div> ;
  
}