import React from 'react'

const MoveButtons = ({getNext, getPrevious}) => {
    return (
        <div className="button-holder">
            <button className = 'nav-btn prev' onClick = {getPrevious}>Prev</button>
            <button className = 'nav-btn next' onClick = {getNext}>Next</button>
        </div>
    )
}

export default MoveButtons
