import React, {useState, useEffect } from 'react';
import axios from 'axios';
import PokeCard from './components/PokeCard'
import Header from './components/Header'
import SeachBar from './components/SearchBar'
import LandingPage from './components/LandingPage';
import FilterButtons from "./components/FilterButtons"
import Comparison from "./components/Comparison"
import ComparingBox from './components/ComparingBox'



const BASEURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1080'
function App() {

  const numPokemonShown = 20;
  const [chosenType, setChosenType] = useState('');
  const [pokeData, setPokeData] = useState([]);
  const [showData, setShowData] = useState([])
  const [currentStart, setCurrentStart] = useState(0)
  const [currentEnd, setCurrentEnd] = useState(20)
  const [loading, setLoading] = useState(true)
  const [searchPoke, setSearchPoke] = useState('')
  const [landing, setLanding ] = useState(true)
  const [comparingArray, setComparingArray] = useState([])
  

  const getPokemon = async () =>{
    const pokemonData = await axios.get(BASEURL)
    setPokeData(pokemonData.data.results)
    setShowData(()=> pokemonData.data.results.slice(currentStart, currentEnd))
    setLoading(false)
    
  }

  useEffect(()=>{
    getPokemon()
    
  },[])

 


  const getNext = () => {

    if(currentEnd > pokeData.length){
      setCurrentEnd(pokeData.length)
      
    }

    if(currentEnd === pokeData.length){
      return
    } 
    if(currentEnd + numPokemonShown > pokeData.length){
      setCurrentEnd(pokeData.length)
      setCurrentStart(pokeData.length - numPokemonShown)
    }else{
      setCurrentStart( (p)=>{
        setCurrentStart(p + numPokemonShown)
      })
  
      setCurrentEnd ( (p) =>{
        setCurrentEnd( p + numPokemonShown)
      })
      
      setShowData(pokeData.slice(currentStart + numPokemonShown, currentEnd + numPokemonShown))
     
    }
    
    
  }

  const getPrevious = () => {
    if(currentStart === 0){
      return
    }

    if(currentStart - numPokemonShown < 0){
      setCurrentStart(0)
      setCurrentEnd(numPokemonShown)
    }else {
      setCurrentStart( (p)=>{
        setCurrentStart(p - numPokemonShown)
      })

      setCurrentEnd ( (p) =>{
        setCurrentEnd( p - numPokemonShown)
      })
      
      setShowData(pokeData.slice(currentStart - numPokemonShown, currentEnd - numPokemonShown))
      

    }
    
  }



  return (
    <>
        <Header />
        {landing? 
        <LandingPage setLanding = {setLanding} /> 
        :   
        (
        <>
          {comparingArray.length > 1 && <Comparison comparingArray = {comparingArray} setComparingArray = {setComparingArray}/>}
          <SeachBar searchPoke = {searchPoke} setSearchPoke = {setSearchPoke} showData = {showData} setShowData = {setShowData}  setCurrentEnd = {setCurrentEnd}/>
          <FilterButtons  getPokemon = {getPokemon} pokeData = {pokeData} showData = {showData} setPokeData = {setPokeData} setShowData = {setShowData} numPokemonShown = {numPokemonShown} chosenType = {chosenType} setChosenType = {setChosenType}
          setCurrentStart = {setCurrentStart}  setCurrentEnd= {setCurrentEnd} />
          {loading ? 'Hold On im Figgen Loading Here' : 
          <PokeCard comparingArray = {comparingArray} setComparingArray = {setComparingArray} pokeData = {pokeData} showData = {showData} getPrevious = {getPrevious} getNext = {getNext} currentStart = {currentStart} currentEnd = {currentEnd} chosenType = {chosenType} />}
          <ComparingBox comparingArray = {comparingArray}/>
        </>
        )}
    </>
  );
}

export default App;
 