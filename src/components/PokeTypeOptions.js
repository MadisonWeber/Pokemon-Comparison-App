import React from 'react'

const PokeTypeOptions = ({type}) => {
    return (
        <option value = {type.name} className = 'type-options'>{type.name}</option>
        
    )
}

export default PokeTypeOptions
