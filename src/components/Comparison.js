import React, { useState, useEffect } from 'react';
import ComparisonInfoCard from './ComparisonInfoCard';
import Modal from 'react-modal';

const Comparison = ({comparingArray, setComparingArray}) => {
   
    const [evaluate, setEvaluate ] = useState()


    const getComparisonLogic = (firstStats, secondStats)=>{
        let retArr = []
        let totalLeft = 0
        let totalRight = 0
        for(let i = 0; i < firstStats.length; i++){
            let pushObj = {left : firstStats[i].base_stat - secondStats[i].base_stat, name : firstStats[i].stat.name , right : secondStats[i].base_stat - firstStats[i].base_stat}
            retArr.push(pushObj)
            totalLeft += pushObj.left
            totalRight += pushObj.right
        }
        retArr.push({left : totalLeft, name : 'Total', right : totalRight})
        
        return retArr
       
    }
    

    useEffect(()=>{
        if(comparingArray.length > 1 ){
            let newEvaluation = getComparisonLogic(comparingArray[0].stats, comparingArray[1].stats)
            setEvaluate(newEvaluation)
            
        }
        
    }, [comparingArray])

    const closeModal= () => {
        setComparingArray([])
    }
    

    const modalStyles = {
        overlay : {
            backgroundColor : `rgba(14, 14, 14, 0.8)`,

        },
        content : {
            backgroundColor: 'transparent',
            display : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin : '0',
            padding : '0',
            border : 'none',
        }
    }



    

    Modal.setAppElement('#root')


    return (
        <Modal isOpen = {comparingArray.length > 1}
               onRequestClose = {closeModal}
               style = {modalStyles}
               shouldCloseOnOverlayClick = {true}
        
        >
            <div className = 'comparison-container'>
                <div className="comparison-holder">
                    {comparingArray ? (comparingArray.map( (poke)=> {
                        return <ComparisonInfoCard key = {poke.name} poke = {poke} />
                    } )) : 'nothing'}
                    <div className = 'evaluate'>
                        <h2 className = 'vs'>VS</h2>
                    {evaluate && evaluate.map( (item, index) =>{
                        return ( 
                                <div key = {index} className = 'innerEvaluate'>
                                    <p className = {item.left > 0 ? 'make-green' : 'make-red'}>{item.left > 0 && '+'}{item.left}</p>
                                    <p className = 'comparison-item-name'>{item.name}</p>
                                    <p className = {item.right > 0 ? 'make-green' : 'make-red'}>{item.right > 0 && '+'}{item.right}</p>
                                </div>
                            
                            )}
                        )
                    } 
                    </div>
                    <button className = 'closeModal' onClick = {closeModal}>Clear</button>
                </div>
                
                
                
            </div>
        </Modal>
    )
}

export default Comparison
