import React from 'react'


const LandingPage = ( {setLanding} ) => {


    const handleLandingClick = () => {
        setLanding ( (p) => {
            setLanding(!p)
        })
    }

    return (
        <div className = 'landing-section'>
            <div className="landing-container">
                <p>This is an app to familiarize users with pokemon, what they look like, what they are good at, and what type they are. It is powered by PokeApi.</p>
                <div className = 'landing-image-holder'>
                    <img src = { require("../photos/pokemon1.png")} alt = 'broken' />
                    <img src = { require('../photos/pokemon2.png')} alt = 'broken' />
                    <img src = { require('../photos/pokemon4.png')} alt = 'broken' />
                </div>
                <button className="continue-poke" onClick = {handleLandingClick}>
                Continue To My Pokemon App
                </button>
            </div>
           
        </div>
    )
}

export default LandingPage
