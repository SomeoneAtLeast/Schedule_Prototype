import React, {Component} from "react";
import PropTypes from 'prop-types';

import "./seats-item.scss"
import chairImg from "./imgs/chair.svg"

export default class SeatsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldIp: this.props.oldIp,
            newIp: this.props.newIp,
            seatNumber: this.props.seatNumber

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

        const {id, onChangeSeatText} = this.props;

        return (    
                <>
                    <img 
                        className="seats-table__img"
                        alt="Место" 
                        src={chairImg}/>
                    <div 
                        className="seats-table__text-wrapper"
                        onBlur={() => onChangeSeatText(id, this.state.oldIp, this.state.newIp, this.state.seatNumber)}>
                        <div className="seats-table__text">
                            <span className="seats-table__label">
                                OLD IP
                            </span> 
                            <span className="seats-table__value">
                                <input 
                                        className="seats-table__value-input"
                                        type="text"
                                        onChange={this.onOldIpChange}
                                        placeholder="Старый IP"
                                        value={this.state.oldIp}/>
                            </span>                               
                        </div>
                        <div className="seats-table__text">
                            <span className="seats-table__label">
                                NEW IP
                            </span>  
                            <span className="seats-table__value">
                            <input 
                                    className="seats-table__value-input"
                                    type="text"
                                    onChange={this.onNewIpChange}
                                    placeholder="Новый IP"
                                    value={this.state.newIp}/>
                            </span>                              
                        </div>
                        <div className="seats-table__text">
                            <span className="seats-table__label">
                                МЕСТО
                            </span>   
                            <span className="seats-table__value">
                            <input 
                                    className="seats-table__value-input"
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

SeatsItem.propTypes = {
    oldIp: PropTypes.string,
    newIp: PropTypes.string,
    seatNumber: PropTypes.string,
    id: PropTypes.number,
    onChangeSeatText: PropTypes.func,
}