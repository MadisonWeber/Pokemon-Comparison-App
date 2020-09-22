import React, {useState} from 'react';
import axios from 'axios';



const PokeInfoCard = ({poke, deleteItem, setComparingArray, comparingArray}) => {

    const [statsOpen, setStatsOpen] = useState(true);

    const getEmoji = (type)=>{
        let reference = {
            'water' : "💦" ,
            'ice': "❄"  ,
            'fire' : "🔥" ,
            'normal' : "🙂",
            'rock' : "🗿",
            'electric': "⚡" ,
            'bug': "🐛",
            'dragon': "🐉",
            'psychic' : "🔮",
            'ground' : "😈",
            'grass' : "🌿",
            'poison': "☠️",
            'fighting': "👊🏼",
            'dark': "🌑",
            'ghost': "👻",
            'steel': '🔪',
            'fairy': '⭐'
        }

        return `${type} ${reference[type]}`
    }


    

    const showStats = () =>{
        setStatsOpen((prev)=>{
            setStatsOpen(!prev)
        }
        )
    }
    
    const addComparison = async (poke)=>{
        const alreadyInComparison = comparingArray.some( item => item.name === poke.name )
        if(alreadyInComparison) return 

        const getPokeDescription = async (url)=>{
            const description = await axios.get(url)
            const data = await description.data
            const pokeDescriptionsEnglish = data.flavor_text_entries.filter(entry  => entry.language.name === 'en')
            const hasSecond = pokeDescriptionsEnglish[1].flavor_text ? pokeDescriptionsEnglish[1].flavor_text : ''
            
            const exportObj = {captureRate : data.capture_rate, info : pokeDescriptionsEnglish[0].flavor_text, secondaryInfo : hasSecond , habitat : data.habitat }
            return exportObj
        }
        const pokeInformation = await getPokeDescription(poke.speciesUrl)
        poke.descriptionInfo = pokeInformation

        if(comparingArray.length === 2){
            setComparingArray((prev)=>{
                setComparingArray([poke, prev[0]])
            }) 
        }else{
            setComparingArray([poke, ...comparingArray])
        }
        
       
    }
    
    return (
        <div className = 'PokemonInfo' >
                <div className="poke-main-info">
                    <h4>{poke.name}</h4>
                    <h6>Type: {getEmoji(poke.type)}</h6>
                </div>
                <img className = 'pokeImage' src = {poke.image} alt = 'Not Available' />
                <div className="height-weight">
                    <p>Height : {poke.height}'</p>
                    <p>Weight : {poke.weight}lb</p>
                </div>
                {statsOpen ? (
                <div className="attributes">
                    <p># of Moves : {poke.numberMoves}</p>
                    <p>Base Experience : {poke.baseExperience}</p>
                </div> )
                :(
                    <div>
                        {poke.stats.map( (item, i) => <div key = {i}> <span className = 'change-upper'>{item.stat.name}</span>: <strong className = 'blue'>{item.base_stat}</strong></div>)}
                         <div>Total : <span className = 'total-stats'>{poke.cumStats}</span></div>
                    </div>
                )
                }
                <div className = 'stats-container'>
                    <button className = 'statsBtn' id = {poke.name} onClick = {()=> showStats(poke.name)}>
                        {statsOpen ? 'Click To See Base Stats' : 'Hide Base Stats'}</button>
                </div>
                
                <button className = 'deleteBtn'  onClick = {()=> deleteItem(poke.name)}><i className="fas fa-times"></i></button>
                <button className = 'compare-poke' onClick = {() => addComparison(poke)}>Compare<i className="far fa-arrow-alt-circle-right" ></i></button>
            
        </div>
    )
}

export default PokeInfoCard
