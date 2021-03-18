import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"

import "./days-field-personal-item.scss";

import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import crossImg from "./../../global-imgs/cross.svg"

const DaysFieldItemPersonal = ({workingHours, onMakeDayWorking, onMakeDayWeekend, onMakeDayVacation}) => {

        return (
            <div 
                className = "days-field-personal__item-body">
                <div className="days-field-personal__item-hours">
                    {workingHours}
                </div>
                <div
                    className="days-field-personal__btn-group">
                    <button
                        title="Сделать рабочим"
                        className="days-field-personal__btn days-field-personal__work-btn"
                        onClick = {onMakeDayWorking}>
                        <img src={workImg} alt="Сделать рабочим"></img>
                    </button>
                    <button
                        title="Сделать выходным"
                        className="days-field-personal__btn days-field-personal__work-btn"
                        onClick = {onMakeDayWeekend}>
                        <img src={weekendImg} alt="Сделать выходным"></img>
                    </button>
                    <button 
                        title="Сделать днем отпуска"
                        className="days-field-personal__btn days-field-personal__work-btn"
                        onClick = {onMakeDayVacation}>
                        <img src={vacationdImg} alt="Сделать днем отпуска"></img>
                    </button>
                    <button
                        title="Выйти"
                    className="days-field-personal__btn days-field-personal__work-btn">
                        <img src={crossImg} alt="Выйти"></img>
                    </button>
                </div>
            </div>
        )
}

DaysFieldItemPersonal.propTypes = {
    dayName: PropTypes.string,
    workingHours: PropTypes.number,
    onMakeDayWorking: PropTypes.func,
    onMakeDayWeekend: PropTypes.func,
    onMakeDayVacation: PropTypes.func,
}

export default connect()(DaysFieldItemPersonal);