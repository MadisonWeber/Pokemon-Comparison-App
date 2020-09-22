import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PokeTypeOptions from "./PokeTypeOptions";


const FilterButtons = ({  getPokemon, setCurrentStart, setCurrentEnd, setShowData, setPokeData, numPokemonShown, chosenType, setChosenType }) => {

    const [pokeTypes, setPokeTypes ] = useState([])


    const handleSubmit = (e) =>{
        
        e.preventDefault()
        
        const neededValue = document.getElementById("select-type").value
        const typeNamesData = async () => {
            const nameData = await axios.get(`https://pokeapi.co/api/v2/type/${neededValue}`)
            const nameArray = nameData.data.pokemon

            const finalNameArray = nameArray.map( poke => poke.pokemon )
            setPokeData(finalNameArray)
            setShowData(finalNameArray.slice(0 , numPokemonShown))
            setCurrentStart(0)
            setCurrentEnd(numPokemonShown)
        }
        if(neededValue === 'Select your option'){
            return
        }else{
            typeNamesData()
            setChosenType(neededValue)
        }
        
    }

 


    useEffect(()=>{
        const getTypes = async () =>{
            const typeData = await axios.get('https://pokeapi.co/api/v2/type/')
            setPokeTypes(typeData.data.results)
        }
        getTypes()
    
    }, [])

    const clearFilter = ()=>{
        if(chosenType === 'Select your option' || chosenType.length < 1){
            return
        }else{
            getPokemon()
            setCurrentStart(0)
            setCurrentEnd(numPokemonShown)
            setChosenType('')
        }
            
    }

   
    return (
        <div className="filter-container">
            <h4>Filter your Results by Pokemon Type:</h4>
            <form className = 'filter-buttons' onSubmit = {handleSubmit}>
                    <select name="type" id="select-type" >
                        <option defaultValue >Select your option</option>
                        {pokeTypes.map( (type) =>{
                            return <PokeTypeOptions key = {type.name} type = {type} />
                        })}
                    </select>
                    <button type = 'submit' className = 'filter-submit'> Submit</button>
                    <button type = 'reset' className="clear-filter" onClick = {clearFilter}>Clear Filter</button>

            </form>       
        </div>
    )
}

export default FilterButtons
