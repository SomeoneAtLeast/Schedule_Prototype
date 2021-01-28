/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./days-field-item.scss";
import workImg from "./work.svg"
import weekendImg from "./weekend.svg"
import vacationdImg from "./vacation.svg"
import crossImg from "./cross.svg"

export default class DaysFieldItem extends Component {

    render () {
        const {dayName, dayNumber, onMakeDayWorking, onMakeDayWeekend} = this.props;

        return (
            <div 
            className = "days-field__item-body">
                <span className="days-field__item-day-name">
                    {dayName}
                </span>
                <span className="days-field__item-number">
                    {dayNumber}
                </span>
                <div
                    className="days-field__btn-group">
                    <button 
                        className="days-field__btn days-field__work-btn"
                        onClick = {onMakeDayWorking}>
                        <img src={workImg}></img>
                    </button>
                    <button 
                        className="days-field__btn days-field__work-btn"
                        onClick = {onMakeDayWeekend}>
                        <img src={weekendImg}></img>
                    </button>
                    <button className="days-field__btn days-field__work-btn">
                        <img src={vacationdImg}></img>
                    </button>
                    <button className="days-field__btn days-field__work-btn">
                        <img src={crossImg}></img>
                    </button>
                </div>
            </div>
        )
    }
}