import React,{useState,useEffect} from 'react';

import { useHistory,useParams } from 'react-router-dom';
import {Pager} from './pager';





export const PokeList:React.FC = ()=>{
  
    const [pokemons,setPokemons] = useState<any[]>();
    const [pageCount,setPagecount] = useState<number>(0);
    const [next,setNext] = useState<string>();
    const [prev,setPrevious] = useState<string>();
    const [pokeid,setPokeid] = useState<Number>();
    const [currentPage,setCurrentPage] = useState<number>(1);
    let {page} = useParams();
    const moveNext=()=>{
       fethcData(next??"");
    };
    const movePrev=()=>{
        fethcData(prev??"");
     };
    const history = useHistory();
    const fethcData=(page:String)=>{
        fetch("/pokemon?"+page).then(data=>data.json())
        .then(l=>{
            var next:string;
            var prev:string;
            setPokemons(l.results);
            next = l.next;
            prev=l.previous;
            setNext(next?.substring(next.indexOf('?')+1));
            setPrevious(prev?.substring(next.indexOf('?')+1));
            setPagecount(l.count/20)
        });
    }
    const selectPokemon=(uri:String)=>{
       var chunks = uri.split("/");
       setPokeid(parseInt(chunks[chunks.length-2]));
    }
    const navigateTo=(uri:String)=>{
        var chunks = uri.split("/");
        
        history.push("/pokemon/"+chunks[chunks.length-2]);
       
     }
    useEffect(()=>{
        let offset="";
       
        if(page)
        {
            offset="offset="+20*page+"&limit=20"
        }
        
        fethcData(offset);
    },[]);
   return <div >
       <div className="pokelist">
       <ul>{pokemons?.map((u,i)=><li onClick={()=>navigateTo(u.url)} onMouseEnter={()=>selectPokemon(u.url)} key={i}>{u.name}</li>)}</ul>
       </div>
       <div className="pokeimage-container">
           <img className="pokeimage" src={"https://pokeres.bastionbot.org/images/pokemon/"+pokeid+".png"}></img>
      </div>
   <Pager pageCount={pageCount} onPageSelected={(p)=>history.push("/pokemon/page/"+p)}></Pager>
   <button  onClick={movePrev}>Previous</button>
   <button onClick={moveNext}>NEXT</button>
   
   </div> ;
  
}