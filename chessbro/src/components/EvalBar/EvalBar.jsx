import React, { useEffect, useState } from 'react'

import "./EvalBar.css"

const EvalBar = ({PGN, currentMove, flipped}) => {
    const [gameEval, setGameEval] = useState(['cp', 0])

    useEffect(() => {    
        if (PGN.move_evaluations[currentMove].eval){
            const currentEvalType = PGN.move_evaluations[currentMove].eval.type
            const currentEval = PGN.move_evaluations[currentMove].eval.value
            setGameEval([currentEvalType, currentEval])
        }
    }, [PGN, currentMove, flipped])

    const blackStyle = {}
    const whiteStyle = {}
    
  return (
    <div className='eval-bar'>
        <div className='black'>
            <a className='eval-value' id='black-eval' style={blackStyle}></a>
        </div>
        <div className='white'>            
            <a className='eval-value' id='black-eval' style={whiteStyle}></a>
        </div>
    </div>
  )
}

export default EvalBar
