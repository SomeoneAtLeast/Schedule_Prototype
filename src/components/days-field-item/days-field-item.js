/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./days-field-item.scss";

export default class DaysFieldItem extends Component {

    render () {
        const {dayNumber, onMakeDayWorking, worked} = this.props;
        let classNames = "days-field__item-body";
        if(worked) {
            classNames += " worked";
        }
        return (
            <div 
            className = {classNames}
            onClick = {onMakeDayWorking}>
                <span className="days-field__item-number">
                    {dayNumber}
                </span>
            </div>
        )
    }
}