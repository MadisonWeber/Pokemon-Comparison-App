import React from 'react'

const ComparingBox = ({comparingArray}) => {

    return (
        <>
            {comparingArray.length === 1 &&  <div className = "comparing-box">
                <p className = 'change-upper'>Add One More Pokemon to compare with {comparingArray[0].name}</p>
                
                </div>}
        </>
    )
}

export default ComparingBox
