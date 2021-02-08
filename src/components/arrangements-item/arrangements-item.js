/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./arrangements-item.scss"
import chairImg from "./imgs/chair.svg"

export default class ArrangementsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {oldIp, newIp, seatNumber} = this.props;

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
                                {oldIp}
                            </span>                               
                        </div>
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                NEW IP
                            </span>  
                            <span className="arrangements-table__value">
                                {newIp}
                            </span>                              
                        </div>
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                МЕСТО
                            </span>   
                            <span className="arrangements-table__value">
                                {seatNumber}
                            </span>                             
                        </div>
                    </div>
                    <div className="arrangements-table__text-wrapper--change">
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                OLD IP
                            </span> 
                            <span className="arrangements-table__value">
                                <input 
                                className="arrangements-table__value-input"
                                type="text" placeholder={oldIp}/>
                            </span>                               
                        </div>
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                NEW IP
                            </span>  
                            <span className="arrangements-table__value">
                                <input 
                                className="arrangements-table__value-input"
                                type="text" placeholder={newIp}/>
                            </span>                              
                        </div>
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                МЕСТО
                            </span>   
                            <span className="arrangements-table__value">
                                <input 
                                className="arrangements-table__value-input"
                                type="text" placeholder={seatNumber}/>
                            </span>                             
                        </div>
                    </div>
                </>
        )
    }
}