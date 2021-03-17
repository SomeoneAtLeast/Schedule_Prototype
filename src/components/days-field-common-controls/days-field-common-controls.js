import React from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import {ChangeDayType} from "../../store/actions"

import "./days-field-common-controls.scss"

import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import clearImg from "./../../global-imgs/clear.svg"

const buttons = [
    {name: "worked",  label: "Назначить рабочим", img: workImg, id: -2},
    {name: "weekend",  label: "Назначить выходным", img: weekendImg, id: -3},
    {name: "vacation",  label: "Назначить отпуском", img: vacationdImg, id: -4},
    {name: "clear",  label: "Убрать назначения", img: clearImg, id: -5}
]

const DaysFieldCommonControls = ({selectedWorker, selectedDay, ChangeDayType}) => {
        return (
            <div className="days-field-common-controls">
                {
                    buttons.map((item) => {
                        const {name, label, img, id} = item;
                    
                        return (
                            <button
                                className="days-field-common-controls-btn"
                                key = {id}
                                onClick={() => ChangeDayType(selectedWorker, selectedDay, name)}>   
                                    <img className="days-field-common-controls-btn__img" src={img} alt={label}></img>
                                    <span className="days-field-common-controls-btn__text">
                                        {label}
                                    </span>
                            </button>
                        )
                    })
                }
            </div>
        )

}

DaysFieldCommonControls.propTypes = {
    selectedWorker: PropTypes.number,
    selectedDay: PropTypes.number,
    ChangeDayType: PropTypes.func,
}

const mapDispatchToProps = {
    ChangeDayType
}

const mapStateToProps = ({selectedWorker, selectedDay}) => {
    return {
        selectedWorker,
        selectedDay
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldCommonControls);