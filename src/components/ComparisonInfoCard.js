import React from 'react'

const ComparisonInfoCard = ({poke}) => {

    const parseInfo = (poke) =>{
        if(poke.descriptionInfo.secondaryInfo.length < 1){
            return poke.descriptionInfo.info
        }

        if(poke.descriptionInfo.info === poke.descriptionInfo.secondaryInfo){
            return poke.descriptionInfo.info
        } else {
            return poke.descriptionInfo.info + " " +poke.descriptionInfo.secondaryInfo
        }

    }


    const infoParsed = parseInfo(poke)


    return (
        <div className = 'comparison-pokemon'>
             <div className="poke-main-info">
                    <h2 className = 'change-upper'> {poke.name}</h2>
                    <p className = 'change-upper'>Habitat : {poke.descriptionInfo.habitat === null ? 'Unknown' : poke.descriptionInfo.habitat.name}</p>
                    <img className = 'pokeImage' src = {poke.image} alt = 'Not Available' />
            </div>
            <div>
                 {poke.stats.map( (item, i) => <div key = {i}> <span className = 'change-upper'>{item.stat.name}</span>: <strong className = 'blue'>{item.base_stat}</strong></div>)}
                 <div>Total : <span className = 'total-stats'>{poke.cumStats}</span></div>
            </div>
            <div className="info-container">
                <p className = 'pokemon-description'>{infoParsed}</p>

            </div>
            
        </div>
    )
}

export default ComparisonInfoCard
