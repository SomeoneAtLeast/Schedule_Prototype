/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./arrangements-item.scss"
import chairImg from "./imgs/chair.svg"

export default class ArrangementsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldIp: "",
            newIp: "",
            seatNumber: ""

        }

        this.onOldIpChange = this.onOldIpChange.bind(this);
        this.onNewIpChange = this.onNewIpChange.bind(this);
        this.onSeatNumberChange = this.onSeatNumberChange.bind(this);
    }

    onOldIpChange(e) {
        this.setState ({
            oldIp: e.target.value
        })
    }

    onNewIpChange(e) {
        this.setState ({
            newIp: e.target.value
        })
    }

    onSeatNumberChange(e) {
        this.setState ({
            seatNumber: e.target.value
        })
    }

    render() {

        const {id, oldIp, newIp, seatNumber, onChangeSeatText, onTextWrapperChangeShow, onTextWrapperChangeHide} = this.props;

        return (    
                <>
                    <img 
                        className="arrangements-table__img"
                        alt="Место" 
                        src={chairImg}/>
                    <div 
                        className="arrangements-table__text-wrapper"
                        onClick={() => onTextWrapperChangeShow(id)}>
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
                    <div 
                        className="arrangements-table__text-wrapper--change"
                        onBlur={() => onChangeSeatText(id, this.state.oldIp, this.state.newIp, this.state.seatNumber)}>
                        <button 
                            className="arrangements-table__save-btn"
                            onClick={() => onTextWrapperChangeHide(id)}>
                            СОХРАНИТЬ
                        </button>
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                OLD IP
                            </span> 
                            <span className="arrangements-table__value">
                                <input 
                                    className="arrangements-table__value-input"
                                    type="text"
                                    onChange={this.onOldIpChange}
                                    placeholder="Новый IP"
                                    value={this.state.oldIp}/>
                            </span>                               
                        </div>
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                NEW IP
                            </span>  
                            <span className="arrangements-table__value">
                                <input 
                                    className="arrangements-table__value-input"
                                    type="text"
                                    onChange={this.onNewIpChange}
                                    placeholder="Старый IP"
                                    value={this.state.newIp}/>
                            </span>                              
                        </div>
                        <div className="arrangements-table__text">
                            <span className="arrangements-table__label">
                                МЕСТО
                            </span>   
                            <span className="arrangements-table__value">
                                <input 
                                    className="arrangements-table__value-input"
                                    type="text"
                                    onChange={this.onSeatNumberChange}
                                    placeholder="№ места"
                                    value={this.state.seatNumber}/>
                            </span>                             
                        </div>
                    </div>
                </>
        )
    }
}