import React from 'react'
import axios from 'axios'

const SearchBar = ({searchPoke, setSearchPoke, showData, setShowData, setCurrentEnd }) => {

    const handleInput = (event) => {
        event.preventDefault()
        setSearchPoke(event.target.value.toLowerCase())
    }

    const handleClick = (event)=>{
        event.preventDefault()
        findPokemon()
        
    } 


    const findPokemon = async() =>{
        const notifyClient = document.querySelector('.error-p')

        try{
        const findData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPoke}/`)
        const currentNames = showData.map(poke => poke.name)
            if(currentNames.includes(findData.data.name)){
                return
            }else{
                let addData = {name: findData.data.name , url : findData.config.url , new :true}
                setShowData([...showData, addData])
                notifyClient.classList.add('success')
                notifyClient.innerText = `Success!!..Pokemon Added`
                setTimeout(()=>{
                    notifyClient.innerText = ''
                    notifyClient.classList.remove('success')
                }, 3000)
                setCurrentEnd( (p)=>{
                    setCurrentEnd(p + 1)
                })
            }
        } catch(err){
            console.log(err)
            notifyClient.classList.add('error')
            notifyClient.innerText = `Oops didn't find anything..make sure you spelled that correctly`
            setTimeout(()=>{
                notifyClient.innerText = ''
                notifyClient.classList.remove('error')
            }, 3000)
        }
        document.querySelector('.search').value = ''
    }



    return (
        <>
            <form className = 'search-form'>
                <input className = 'search' type="text" id = 'search' name = 'search' placeholder = 'Search for Pokemon...' onChange= {handleInput}/>
                <button type = 'submit' className="search-btn" onClick = {handleClick}>Submit</button>
            </form>
            <div className = 'error-div'><p className = 'error-p'></p></div>
        </>
    )
}

export default SearchBar
