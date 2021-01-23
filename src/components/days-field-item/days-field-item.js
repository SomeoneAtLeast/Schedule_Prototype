/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./days-field-item.scss";
import workImg from "./work.svg"

export default class DaysFieldItem extends Component {

    render () {
        const {dayName, dayNumber, onMakeDayWorking, worked} = this.props;
        let classNames = "days-field__item-body";

        if(worked) {
            classNames += " worked";
        }
        
        return (
            <div 
            className = {classNames}
            onClick = {onMakeDayWorking}>
                <span className="days-field__item-day-name">
                    {dayName}
                </span>
                <span className="days-field__item-number">
                    {dayNumber}
                </span>
                <div className="days-field__btn-group">
                    <button className="days-field__btn days-field__work-btn">
                        <img src={workImg}></img>
                    </button>
                </div>
            </div>
        )
    }
}