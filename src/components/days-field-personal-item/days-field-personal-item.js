import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"

import {ChangeDayType} from "../../store/actions"

import "./days-field-personal-item.scss";

import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import crossImg from "./../../global-imgs/cross.svg"

const DaysFieldItemPersonal = ({workingHours, workerNumber, dayNumber, openDayMenu, openChangeShiftMenu, onMakeDayWeekend, onMakeDayVacation, closeDayMenu, ChangeDayType}) => {
    const buttons = [
        {
            name: "worked",
            label: "Назначить рабочим",
            img: workImg,
            func: openChangeShiftMenu,
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
        {name: "weekend",  label: "Назначить выходным", img: weekendImg, func: onMakeDayWeekend,  id: -3},
        {name: "vacation",  label: "Назначить отпуском", img: vacationdImg, func: onMakeDayVacation,  id: -4},
        {name: "exit",  label: "Выйти", img: crossImg, func: closeDayMenu,  id: -5},
    ]

    return (
        <div className="days-field-personal__item-body">
            <div 
                className="days-field-personal__item-hours"
                onClick={openDayMenu}>
                    <span className="days-field-personal__item-hours-text">
                        {workingHours}
                    </span>
            </div>
            <ul className="days-field-personal__sub-menu">
                {
                    buttons[0].subMenu.map((subItem) => {
                        const {workingTime, hoursCount, id} = subItem;

                        return (
                            <li className="days-field-personal__sub-menu-item"
                                key = {id}>
                                <button
                                    className={`days-field-personal__sub-menu-item-btn days-field-personal__sub-menu-item-btn-${workingTime}`}
                                    onClick={() => ChangeDayType(workerNumber, dayNumber, "worked", workingTime, hoursCount)}
                                    >   
                                        <span>
                                            {workingTime}
                                        </span>
                                </button>
                            </li>                                               
                        )
                    })
                }
            </ul>
            <ul className="days-field-personal__btn-group-list">
                {
                    buttons.map((item) => {
                        const {label, img, func, id} = item;
                            return (
                                <li className="days-field-personal__btn-group-list-item" 
                                    key = {id}>
                                    <button
                                        title={label} 
                                        className="days-field-personal__btn-group-list-btn"
                                        onClick = {func}>
                                        <img src={img} alt={label}></img>
                                    </button>
                                </li>
                            )

                    })
                }
            </ul>
        </div>












        // <div 
        //     className = "days-field-personal__item-body">
        //     <div className="days-field-personal__item-hours">
        //         {workingHours}
        //     </div>
        //     <div className="days-field-personal__btn-group">
        //         <button
        //             title="Сделать рабочим"
        //             className="days-field-personal__btn days-field-personal__work-btn"
        //             // onClick = {onMakeDayWorking}
        //             >
        //             <img src={workImg} alt="Сделать рабочим"></img>
        //         </button>
        //         <button
        //             title="Сделать выходным"
        //             className="days-field-personal__btn days-field-personal__work-btn"
        //             onClick = {onMakeDayWeekend}>
        //             <img src={weekendImg} alt="Сделать выходным"></img>
        //         </button>
        //         <button 
        //             title="Сделать днем отпуска"
        //             className="days-field-personal__btn days-field-personal__work-btn"
        //             onClick = {onMakeDayVacation}>
        //             <img src={vacationdImg} alt="Сделать днем отпуска"></img>
        //         </button>
        //         <button
        //             title="Выйти"
        //         className="days-field-personal__btn days-field-personal__work-btn">
        //             <img src={crossImg} alt="Выйти"></img>
        //         </button>

        //     </div>
        // </div>
    )
}

DaysFieldItemPersonal.propTypes = {
    dayName: PropTypes.string,
    workingHours: PropTypes.number,
    openChangeShiftMenu: PropTypes.func,
    onMakeDayWeekend: PropTypes.func,
    onMakeDayVacation: PropTypes.func,
    makeWorkingBtnActive: PropTypes.bool,
    openDayMenu: PropTypes.func,
    closeDayMenu: PropTypes.func,
    ChangeDayType: PropTypes.func,
    dayNumber: PropTypes.number,
    workerNumber: PropTypes.number
}

const mapDispatchToProps = {
    ChangeDayType
}

export default connect(null, mapDispatchToProps)(DaysFieldItemPersonal);
