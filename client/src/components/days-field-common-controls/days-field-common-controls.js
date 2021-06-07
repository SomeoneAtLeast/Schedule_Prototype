import React from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {ChangeDayType, ShowOrCloseWorkingHours, ChangeMonthlyNorm, ChangeNumberOfShifts, ChangeNumberOfBreaks, ChangeNorm, ChangeWithTrainingAndBreaks, ChangeWithADecreasingCoefficient, ChangeMessagePlan, ChangeTotalWithTheNight, ChangeAdjustment,
    ChangeSecondBreaks} from "../../store/actions"

import "./days-field-common-controls.scss"

import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import clearImg from "./../../global-imgs/clear.svg"
import takeOfImg from "./../../global-imgs/take-off.svg"

const DaysFieldCommonControls = ({selectedWorker, selectedDay, makeWorkingBtnActive, ChangeDayType, ShowOrCloseWorkingHours,
ChangeMonthlyNorm, ChangeNumberOfShifts, ChangeNumberOfBreaks, ChangeNorm, ChangeWithTrainingAndBreaks, ChangeWithADecreasingCoefficient, ChangeMessagePlan, ChangeTotalWithTheNight, ChangeAdjustment,
ChangeSecondBreaks}) => {


    const buttons = [
        {
            name: "worked",
            label: "Назначить рабочим",
            img: workImg,
            id: -2,
            subMenu: [
                {
                    workingTime: "Руководитель",
                    hoursCount: 8,
                    id: -48
                },
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
                {
                    workingTime: "21-09",
                    hoursCount: 11,
                    id: -57
                },
                
            ]
        },
        {name: "weekend",  label: "Назначить выходным", hoursCount: 0, img: weekendImg, id: -3},
        {name: "vacation",  label: "Назначить отпуском", hoursCount: 0, img: vacationdImg, id: -4},
        {name: "takeOf",  label: "Снять назначения", hoursCount: 0, img: takeOfImg, id: -5},
        {name: "clear",  label: "Убрать выделения", img: clearImg, id: -6},
    ]

    return (
        <ul className="days-field-common-controls">
            {
                buttons.map((item) => {
                    const {name, label, hoursCount, img, id} = item;

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
                                            let verifiedWorkingTime = workingTime;
                                            
                                            if (verifiedWorkingTime === "Руководитель") {
                                                verifiedWorkingTime = "director"
                                            }

                                            return (
                                                <li className="days-field-common-controls__sub-menu-item" key = {id}>
                                                    <button
                                                        className={`days-field-common-controls__sub-menu-item-btn days-field-common-controls__sub-menu-item-btn-${verifiedWorkingTime}`}
                                                        onClick={() => {ChangeDayType(selectedWorker, selectedDay, name, workingTime, hoursCount); ChangeMonthlyNorm(); ChangeNumberOfShifts(); ChangeNumberOfBreaks();
                                                        ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient(); ChangeTotalWithTheNight(); ChangeMessagePlan(); ChangeAdjustment(); ChangeSecondBreaks()}}>   
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
                                    onClick={() => {ChangeDayType(selectedWorker, selectedDay, name, hoursCount, hoursCount); ChangeMonthlyNorm(); ChangeNumberOfShifts(); ChangeNumberOfBreaks();
                                    ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient(); ChangeTotalWithTheNight(); ChangeMessagePlan(); ChangeAdjustment(); ChangeSecondBreaks()}}>   
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
    ShowOrCloseWorkingHours,
    ChangeMonthlyNorm,
    ChangeNumberOfShifts,
    ChangeNumberOfBreaks,
    ChangeNorm,
    ChangeWithTrainingAndBreaks,
    ChangeWithADecreasingCoefficient,
    ChangeMessagePlan,
    ChangeTotalWithTheNight,
    ChangeAdjustment,
    ChangeSecondBreaks
}

const mapStateToProps = ({workers, currentYear, currentMonth, selectedWorker, selectedDay, makeWorkingBtnActive}) => {
    return {
        workers,
        selectedWorker,
        selectedDay,
        makeWorkingBtnActive,
        currentYear,
        currentMonth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldCommonControls);