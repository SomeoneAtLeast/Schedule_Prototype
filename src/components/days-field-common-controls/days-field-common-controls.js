/* eslint-disable react/prop-types */
import React from "react";

import "./days-field-common-controls.scss"

import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import clearImg from "./../../global-imgs/clear.svg"

const buttonsArr = [
    {name: "worked",  label: "Назначить Рабочими", img: workImg, id: -2},
    {name: "weekend",  label: "Назначить Выходными", img: weekendImg, id: -3},
    {name: "vacation",  label: "Назначить Отпуском", img: vacationdImg, id: -4},
    {name: "clear",  label: "Убрать назначения", img: clearImg, id: -5}
]

const DaysFieldCommonControls = ({selectedWorker, selectedDay, onChangeDayType, onClearAllDays}) => {

    const buttons = buttonsArr.map((item) => {
        const {name, label, img, id} = item;
    
        return (
            <button
                className="days-field-common-controls-btn"
                key = {id}
                onClick={() => onChangeDayType(selectedWorker, selectedDay, name)}>   
                    <img className="days-field-common-controls-btn__img" src={img} alt={label}></img>
                    <span className="days-field-common-controls-btn__text">
                        {label}
                    </span>
            </button>
        )
    })
        return (
            <div className="controls">
                {buttons}

                <button
                className="days-field-common-controls-btn"
                onClick={() => onClearAllDays()}>   
                    <img className="days-field-common-controls-btn__img"></img>
                    <span className="days-field-common-controls-btn__text">
                        ABOBA
                    </span>
            </button>
            </div>
        )

}

export default DaysFieldCommonControls;