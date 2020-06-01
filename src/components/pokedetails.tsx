import React,{useState,useEffect} from 'react';

interface PokeDetailProps{
    id:number;
} 

export const PokeDetails:React.FC<PokeDetailProps> = (props)=>{

    const [det,setDetails]=useState<any>();
    const [flavs,setFlavours]=useState<String[]>();
    useEffect(()=>{
        fetch("/pokemon-species/"+props.id).then(data=>data.json())
        .then(l=>{
            console.log(l);
            var flavours:String[];
            flavours=[];
            for(var i in l.flavor_text_entries){
               
                if(l.flavor_text_entries[i].language.name==="it"){
                    flavours.push(l.flavor_text_entries[i].flavor_text);
                }
            }
            setDetails(l);
            setFlavours(flavours);
        });
    },[]);

    return <div>
        <div className="pokename">{det?.name}</div>
        <div className="pokeimage-details-container">
           <img className="pokeimage-details" src={"https://pokeres.bastionbot.org/images/pokemon/"+props.id+".png"}></img>
        </div>
        <div className="flavorcontainer">
            {flavs?.map((u,i)=><p key={i}>{u}</p>)}
        </div>
    </div>
}