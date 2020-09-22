import React, {useState} from 'react'
import axios from 'axios'
import PokeInfoCard from './PokeInfoCard'
import MoveButtons from './MoveButtons'

const PokeCard = ({pokeData, getPrevious, getNext, showData, currentStart, currentEnd, chosenType, setComparingArray, comparingArray}) => {

    const [pokeInfo, setPokeInfo] = useState([])

    const showInfo = (url, pokeName)=>{

        const currentNames = pokeInfo.map(poke => poke.name)
        const getPokeInfo = async (url)=>{
            const currentInfo = await axios.get(url);
            const {data} = currentInfo
            let totalStats = 0
            data.stats.forEach( stat => totalStats += stat.base_stat)
            const addObject = {name : pokeName, baseExperience : data.base_experience, numberMoves : data.moves.length, height : data.height, weight : data.weight ,type : data.types[0].type.name , image : data.sprites.front_default, stats: data.stats , cumStats : totalStats, speciesUrl : data.species.url}
            setPokeInfo([addObject , ...pokeInfo])
            
        }

        if(currentNames.includes(pokeName)){
            return 
        }else{
             getPokeInfo(url)
        }
        
    }

    const deleteItem = (name)=>{
        setPokeInfo((p)=>{
            const newPokeInfo = p.filter( (poke) =>{
                return poke.name !== name
            })
            return newPokeInfo
        })
    }



    
    return (
        <div className="outer-holder">
            <span>Showing {currentStart + 1}-{currentEnd} of {pokeData.length} known { chosenType.length >1 && chosenType } Pokemon</span>
            <div className="card-holder">
                
                {showData.map( (poke)=>{
                    return( <div className = {poke.new ? 'pokeDiv new' : 'pokeDiv'} key = {poke.name} >
                                <div className = 'pokeName'>{poke.name}</div>
                                <button className = 'pokeBtn' onClick = {()=>showInfo(poke.url, poke.name)}></button>
                            </div>)
                })}

            </div>
            <MoveButtons getPrevious= {getPrevious} getNext = {getNext}/>
            <div className="info-holder">
                {pokeInfo.map((poke) => {
                    return(<PokeInfoCard key = {poke.name} poke = {poke} deleteItem = {deleteItem} setComparingArray = {setComparingArray} comparingArray = {comparingArray}/>)
                })}
            </div>
        </div>
       
    )
        
}


export default PokeCard
