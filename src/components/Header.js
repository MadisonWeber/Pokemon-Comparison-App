import React from 'react'


const Header = () => {
    return (
        <div className = 'header'>
            <div className="header-container">
                <h1>Welcome to My Pokemon App</h1>
                <small>Use this to Research different Pokemon!</small>
                <p>Click on the PokeBall to See information about the Pokemon, Press Compare to Compare Pokemon Stats!</p>
            </div>
            <img className = 'headerImg' src={require('../photos/pikachu.png')} alt="broken"/>
        </div>
    )
}

export default Header
