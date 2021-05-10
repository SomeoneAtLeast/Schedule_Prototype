import React, {useState} from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {useHttp} from "../../hooks/http.hook"
import {ChangeDayType, ShowOrCloseWorkingHours, ClearAllDays, WorkersLoaded} from "../../store/actions"

import "./days-field-common-controls.scss"

import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"
import clearImg from "./../../global-imgs/clear.svg"
import takeOfImg from "./../../global-imgs/take-off.svg"
import cancelImg from "./../../global-imgs/cancel.svg"
import saveImg from "./../../global-imgs/save.svg"
import dualBallImg from "../dual-ball/dual-ball.svg"

const DaysFieldCommonControls = ({workers, currentYear, currentMonth, selectedWorker, selectedDay, makeWorkingBtnActive, ChangeDayType, ShowOrCloseWorkingHours, ClearAllDays, WorkersLoaded}) => {

    const [loadingWorkers, setLoadingWorkers] = useState(false);
    const [saveProcess, setSaveProcess] = useState(false);

    const {request} = useHttp();

    const saveWorkers = async () => {
        try {
            setSaveProcess(true)
            await ClearAllDays();
            await request("/api/workers/workers-update", "POST", workers, {year: currentYear, month: currentMonth});
            setSaveProcess(false)
        } catch (e) {}
    }

    const getWorkers = async () => {
        try {
            setLoadingWorkers(true)
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            WorkersLoaded(data);
            setLoadingWorkers(false)
        } catch (e) {}
    };

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
        {name: "clear",  label: "Убрать выделения", img: clearImg, id: -6},
        {name: "save",  label: "Отменить изменения", func: getWorkers, img:  loadingWorkers ? dualBallImg : cancelImg, id: -7},
        {name: "save",  label: "Сохранить", func: saveWorkers, img: saveProcess ? dualBallImg : saveImg, id: -8},
    ]

    return (
        <ul className="days-field-common-controls">
            {
                buttons.map((item) => {
                    const {name, label, func, img, id} = item;

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
                                    onClick={func ? () => func() : () => ChangeDayType(selectedWorker, selectedDay, name)}>   
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
    ClearAllDays,
    WorkersLoaded
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