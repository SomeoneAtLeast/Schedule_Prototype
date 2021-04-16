import React from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import {ChangeDayType, ShowOrCloseWorkingHours} from "../../store/actions"

import "./days-field-common-controls.scss"

import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import clearImg from "./../../global-imgs/clear.svg"
import takeOfImg from "./../../global-imgs/take-off.svg"

const buttons = [
    {
        name: "worked",
        label: "Назначить рабочим",
        img: workImg,
        id: -2,
        subMenu: [
            {
                workingTime: "09-18",
                hoursCount: 8,
                id: -49
            },
            {
                workingTime: "11-20",
                hoursCount: 8,
                id: -50
            },
            {
                workingTime: "08-20",
                hoursCount: 11,
                id: -51
            },
            {
                workingTime: "09-21",
                hoursCount: 11,
                id: -52
            },
            {
                workingTime: "10-22",
                hoursCount: 11,
                id: -53
            },
            {
                workingTime: "11-23",
                hoursCount: 11,
                id: -54
            },
            {
                workingTime: "12-24",
                hoursCount: 11,
                id: -55
            },
            {
                workingTime: "14-02",
                hoursCount: 11,
                id: -56
            },
        ]
    },
    {name: "weekend",  label: "Назначить выходным", img: weekendImg, id: -3},
    {name: "vacation",  label: "Назначить отпуском", img: vacationdImg, id: -4},
    {name: "takeOf",  label: "Снять назначения", img: takeOfImg, id: -5},
    {name: "clear",  label: "Убрать выделения", img: clearImg, id: -6}
]

const DaysFieldCommonControls = ({selectedWorker, selectedDay, makeWorkingBtnActive, ChangeDayType, ShowOrCloseWorkingHours}) => {
        return (
            <ul className="days-field-common-controls">
                {
                    buttons.map((item) => {
                        const {name, label, img, id} = item;

                        if (item.subMenu) {
                            let subMenuClassNames = "days-field-common-controls__sub-menu";
                            let controlsBtnClassName = "days-field-common-controls__item-btn days-field-common-controls__item-btn-with-sub-menu";

                            if (makeWorkingBtnActive) {
                                subMenuClassNames += " days-field-common-controls__sub-menu-active"
                                controlsBtnClassName += " days-field-common-controls__item-btn-with-sub-menu-active"
                            }

                            return (
                                <li className="days-field-common-controls__item" key = {id}>
                                    <button
                                        className={controlsBtnClassName}
                                        onClick={() => ShowOrCloseWorkingHours()}>   
                                            <img className="days-field-common-controls__item-btn-img" src={img} alt={label}></img>
                                            <span className="days-field-common-controls__item-btn-text">
                                                {label}
                                            </span>
                                    </button>
                                    <ul className={subMenuClassNames}>
                                        {
                                            item.subMenu.map((subItem) => {
                                                const {workingTime, hoursCount, id} = subItem;

                                                return (
                                                    <li className="days-field-common-controls__sub-menu-item" key = {id}>
                                                        <button
                                                            className={`days-field-common-controls__sub-menu-item-btn days-field-common-controls__sub-menu-item-btn-${workingTime}`}
                                                            onClick={() => ChangeDayType(selectedWorker, selectedDay, name, workingTime, hoursCount)}>   
                                                                <span className="days-field-common-controls__sub-menu-item-btn-text">
                                                                    {workingTime}
                                                                </span>
                                                        </button>
                                                    </li>                                               
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        } else {
                            return (
                                <li className="days-field-common-controls__item" key = {id}>
                                    <button
                                        className="days-field-common-controls__item-btn"
                                        onClick={() => ChangeDayType(selectedWorker, selectedDay, name)}>   
                                            <img className="days-field-common-controls__item-btn-img" src={img} alt={label}></img>
                                            <span className="days-field-common-controls__item-btn-text">
                                                {label}
                                            </span>
                                    </button>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )

}

DaysFieldCommonControls.propTypes = {
    selectedWorker: PropTypes.number,
    selectedDay: PropTypes.number,
    ChangeDayType: PropTypes.func,
    makeWorkingBtnActive: PropTypes.bool,
    ShowOrCloseWorkingHours: PropTypes.func
}

const mapDispatchToProps = {
    ChangeDayType,
    ShowOrCloseWorkingHours
}

const mapStateToProps = ({selectedWorker, selectedDay, makeWorkingBtnActive}) => {
    return {
        selectedWorker,
        selectedDay,
        makeWorkingBtnActive
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldCommonControls);