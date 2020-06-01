import React,{useState,useEffect} from 'react';
import { getPackedSettings } from 'http2';

interface PagerProps{
    firstLabel?:String;
    lastLabel?:String;
    prevLabel?:String;
    nextLabel?:String;
    omissisLabel?:String;
    pageCount:number;
    pagesLen?:number;
    onPageSelected:((page:number)=>void);
}

export const Pager:React.FC<PagerProps> = (props)=>{
    const [firstVisible,setFirstVisible] = useState<number>(1);
    const [pageSelected,setPageSelected] = useState<number>(1);
    let fl = props.firstLabel??"First";
    let lp = props.lastLabel??"Last";
    let pl =props.prevLabel??"«";
    let nl = props.nextLabel??"»";
    let ol = props.omissisLabel??"...";
    let visible = props.pagesLen??3;
    const getPages=(visible:number)=>{
        let items: any[] =[];
        let max = Math.min(firstVisible+visible-1,props.pageCount);
        for(let i=Math.round(firstVisible);i<=Math.round(max);i++){
            items.push(<li className={"pager-page "+(i===pageSelected?"pager-page-selected":"")} 
            key={i}
            onClick={()=>{setPageSelected(i);props.onPageSelected(i);}}
            >
                {i}</li>);
        }
        return items;
    }
    const Prev=()=>{
       
        if(pageSelected > 1){
            props.onPageSelected(pageSelected-1)
            setPageSelected(pageSelected-1);
         
            if(pageSelected-1<firstVisible){
                setFirstVisible(firstVisible-1);
                
            }
        }
    }
    const PagePrev=()=>{
       
        if(pageSelected > visible){
            props.onPageSelected(pageSelected-visible)
            setPageSelected(pageSelected-visible);
            
            if(pageSelected-visible<firstVisible){
                setFirstVisible(firstVisible-visible);
            }
        }
    }
    const Next=()=>{
        
        if(pageSelected < props.pageCount){
            setPageSelected(pageSelected+1);
            props.onPageSelected(pageSelected+1);
            
            if(pageSelected+1>firstVisible+visible-1){
                setFirstVisible(firstVisible+1);
            }
        }
    }
    const PageNext=()=>{
      
        if(pageSelected < props.pageCount-visible){
            setPageSelected(pageSelected+visible);
            props.onPageSelected(pageSelected+visible);
        
            if(pageSelected+visible>firstVisible+visible-1){
                setFirstVisible(firstVisible+visible);
            }
        }
    }
    const First=()=>{
        setFirstVisible(1);
        setPageSelected(1);
        props.onPageSelected(1);
    }
    const Last=()=>{
        setFirstVisible(props.pageCount-visible+1);
        setPageSelected(props.pageCount);
        props.onPageSelected(props.pageCount);
    }
    return <ul className="pager-list">
        <li className="pager-first" onClick={First}>{fl}</li>
        <li className="pager-page" onClick={Prev}>{pl}</li>
        <li className="pager-page" onClick={PagePrev}>{ol}</li>
        {getPages(visible)}
        <li className="pager-page" onClick={Next}>{nl}</li>
        <li className="pager-page" onClick={PageNext}>{ol}</li>
        <li className="pager-last"  onClick={Last}>{lp}</li>
    </ul>
}