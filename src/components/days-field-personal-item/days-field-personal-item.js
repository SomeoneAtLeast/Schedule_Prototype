import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"

import "./days-field-personal-item.scss";

import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import crossImg from "./../../global-imgs/cross.svg"

const DaysFieldItemPersonal = ({workingHours, onMakeDayWeekend, onMakeDayVacation}) => {

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
        {name: "weekend",  label: "Назначить выходным", img: weekendImg, func: onMakeDayWeekend,  id: -3},
        {name: "vacation",  label: "Назначить отпуском", img: vacationdImg, func: onMakeDayVacation,  id: -4},
        {name: "exit",  label: "Выйти", img: crossImg, func: null,  id: -5},
    ]

    return (
        <div className="days-field-personal__item-body">
            <div className="days-field-personal__item-hours">
                {workingHours}
            </div>
            <ul className="days-field-personal__btn-group-list">
                {
                    buttons.map((item) => {
                        const {label, img, func, id} = item;

                        if (item.subMenu) {
                            // let subMenuClassNames = "days-field-common-controls__sub-menu";
                            // let controlsBtnClassName = "days-field-common-controls__item-btn days-field-common-controls__item-btn-with-sub-menu";

                            // if (makeWorkingBtnActive) {
                            //     subMenuClassNames += " days-field-common-controls__sub-menu-active"
                            //     controlsBtnClassName += " days-field-common-controls__item-btn-with-sub-menu-active"
                            // }

                            return (
                                <li className="days-field-personal__btn-group-list-item" 
                                    key = {id}>
                                    <button
                                        title={label}
                                        className="days-field-personal__btn-group-list-btn"
                                        // onClick = {onMakeDayWorking}
                                        >
                                        <img src={img} alt={label}></img>
                                    </button>
                                    <ul className="days-field-personal__sub-menu">
                                        {
                                            item.subMenu.map((subItem) => {
                                                const {workingTime, id} = subItem;

                                                return (
                                                    <li className="days-field-personal__sub-menu-item"
                                                        key = {id}>
                                                        <button
                                                            className={`days-field-personal__sub-menu-item-btn days-field-personal__sub-menu-item-btn-${workingTime}`}
                                                            // onClick={() => ChangeDayType(selectedWorker, selectedDay, name, workingTime, hoursCount)}
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
                                </li>
                            )
                        } else {
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
                        }
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
    // onMakeDayWorking: PropTypes.func,
    onMakeDayWeekend: PropTypes.func,
    onMakeDayVacation: PropTypes.func,
}

export default connect()(DaysFieldItemPersonal);