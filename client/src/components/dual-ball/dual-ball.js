import React from 'react';

import "./dual-ball.scss"
import dualBallImg from "./dual-ball.gif"

const DualBall = () => {
    return (
        <div className="dual-ball">
            <img 
                className="dual-ball__img"
                src={dualBallImg}
                alt="Загрузка"></img>
        </div>
    )
}

export default DualBall;