import React, {Component} from "react";
import PropTypes from 'prop-types';

import "./days-field-item.scss";
import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import crossImg from "./../../global-imgs/cross.svg"

export default class DaysFieldItem extends Component {

    render () {
        const {workingHours, onMakeDayWorking, onMakeDayWeekend, onMakeDayVacation} = this.props;

        return (
            <div 
                className = "days-field__item-body">
                <span className="days-field__item-day-name">
                    {workingHours}
                </span>
                <div
                    className="days-field__btn-group">
                    <button 
                        className="days-field__btn days-field__work-btn"
                        onClick = {onMakeDayWorking}>
                        <img src={workImg} alt="Сделать рабочим"></img>
                    </button>
                    <button 
                        className="days-field__btn days-field__work-btn"
                        onClick = {onMakeDayWeekend}>
                        <img src={weekendImg} alt="Сделать выходным"></img>
                    </button>
                    <button 
                        className="days-field__btn days-field__work-btn"
                        onClick = {onMakeDayVacation}>
                        <img src={vacationdImg} alt="Сделать днем отпуска"></img>
                    </button>
                    <button className="days-field__btn days-field__work-btn">
                        <img src={crossImg} alt="Выйти"></img>
                    </button>
                </div>
            </div>
        )
    }
}

DaysFieldItem.propTypes = {
    dayName: PropTypes.string,
    workingHours: PropTypes.number,
    onMakeDayWorking: PropTypes.func,
    onMakeDayWeekend: PropTypes.func,
    onMakeDayVacation: PropTypes.func,
}