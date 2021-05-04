import React from 'react';

import "./dual-ball.scss"
import dualBallImg from "./dual-ball.svg"

const DualBall = ({className}) => {
    return (
        <div className={"dual-ball " + className}>
            <img 
                className="dual-ball__img"
                src={dualBallImg}
                alt="Загрузка"></img>
        </div>
    )
}

export default DualBall;