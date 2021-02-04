import React, {Component} from "react";

import "./arrangements-item.scss"
import chairImg from "./imgs/chair.svg"

export default class ArrangementsItem extends Component {
    render() {
        return (    
                <>
                    <img 
                        className="arrangements-table__img"
                        alt="Место" 
                        src={chairImg}/>
                    <div className="arrangements-table__text-wrapper">
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                OLD IP
                            </span> 
                            <span className="arrangements-table__value">
                                10.160.140.111
                            </span>                               
                        </div>
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                NEW IP
                            </span>  
                            <span className="arrangements-table__value">
                                10.160.149.221
                            </span>                              
                        </div>
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                МЕСТО
                            </span>   
                            <span className="arrangements-table__value">
                                3019.65 (127)
                            </span>                             
                        </div>
                    </div>
                </>
        )
    }
}