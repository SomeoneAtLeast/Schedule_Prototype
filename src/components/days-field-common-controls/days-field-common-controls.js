import React from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import {ChangeDayType, ShowOrCloseWorkingHours} from "../../store/actions"

import "./days-field-common-controls.scss"

import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import clearImg from "./../../global-imgs/clear.svg"

const buttons = [
    {
        name: "worked",
        label: "Назначить рабочим",
        img: workImg,
        id: -2,
        subMenu: [
            {
                workedTime: "08-20",
                hoursCount: 11,
                id: -51
            },
            {
                workedTime: "09-21",
                hoursCount: 11,
                id: -52
            },
            {
                workedTime: "10-22",
                hoursCount: 11,
                id: -53
            },
            {
                workedTime: "11-23",
                hoursCount: 11,
                id: -54
            },
            {
                workedTime: "12-24",
                hoursCount: 11,
                id: -55
            },
            {
                workedTime: "14-02",
                hoursCount: 11,
                id: -56
            },
        ]
    },
    {name: "weekend",  label: "Назначить выходным", img: weekendImg, id: -3},
    {name: "vacation",  label: "Назначить отпуском", img: vacationdImg, id: -4},
    {name: "clear",  label: "Убрать назначения", img: clearImg, id: -5}
]

const DaysFieldCommonControls = ({selectedWorker, selectedDay, makeWorkingBtnActive, ChangeDayType, ShowOrCloseWorkingHours}) => {
        return (
            <ul className="days-field-common-controls">
                {
                    buttons.map((item) => {
                        const {name, label, img, id} = item;

                        if (item.subMenu) {
                            let classNames = "days-field-common-controls__sub-menu";

                            if (makeWorkingBtnActive) {
                                classNames += " days-field-common-controls__sub-menu-active"
                            }

                            return (
                                <li className="days-field-common-controls__item" key = {id}>
                                    <button
                                        className="days-field-common-controls__item-btn"
                                        onClick={() => ShowOrCloseWorkingHours()}>   
                                            <img className="days-field-common-controls__item-btn-img" src={img} alt={label}></img>
                                            <span className="days-field-common-controls__item-btn-text">
                                                {label}
                                            </span>
                                    </button>
                                    <ul className={classNames}>
                                        {
                                            item.subMenu.map((subItem) => {
                                                const {workedTime, id} = subItem;

                                                return (
                                                    <li className="days-field-common-controls__sub-menu-item" key = {id}>
                                                        <button
                                                            className={`days-field-common-controls__sub-menu-item-btn days-field-common-controls__sub-menu-item-btn-${workedTime}`}
                                                            // onClick={() => ChangeDayType(selectedWorker, selectedDay, name)}
                                                            >   
                                                                <span className="days-field-common-controls__sub-menu-item-btn-text">
                                                                    {workedTime}
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