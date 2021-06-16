import React, {useState} from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {useHttp} from "../../hooks/http.hook"
import {ClearAllDays, WorkersLoaded, DatesLoaded} from "../../store/actions"

import "./save-and-cancel.scss"

import cancelImg from "./../../global-imgs/cancel.svg"
import saveImg from "./../../global-imgs/save.svg"
import dualBallImg from "../dual-ball/dual-ball.svg"

const SaveAndCancel= ({workers, dates, currentYear, currentMonth, ClearAllDays, WorkersLoaded, DatesLoaded}) => {
    const [loadingDates, setloadingDates] = useState(false);
    const [loadingWorkers, setLoadingWorkers] = useState(false);
    const [saveProcess, setSaveProcess] = useState(false);

    const {request} = useHttp();

    const saveWorkers = async () => {
        try {
            setSaveProcess(true)
            ClearAllDays();
            await request("/api/workers/workers-update", "POST", workers, {year: currentYear, month: currentMonth});
            setSaveProcess(false)
        } catch (e) {}
    }

    const saveDates = async () => {
        try {
            setSaveProcess(true)
            ClearAllDays();
            await request("/api/dates/dates-update", "POST", dates, {year: currentYear, month: currentMonth});
            setSaveProcess(false)
        } catch (e) {}
    }

    const getWorkers = async () => {
        try {
            setLoadingWorkers(true);
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear, month: currentMonth});
            WorkersLoaded(data);
            setLoadingWorkers(false)
        } catch (e) {}
    };

    const getDates = async () => {
        try {
            setloadingDates(true);
            const data = await request("/api/dates/dates", "GET", null, {year: currentYear, month: currentMonth});
            DatesLoaded(data);
            setloadingDates(false);
        } catch (e) {}
    };

    const buttons = [
        {name: "save",  label: "Отменить изменения", func: () => {getWorkers(); getDates()}, img:  (loadingWorkers || loadingDates) ? dualBallImg : cancelImg, id: -7},
        {name: "save",  label: "Сохранить", func: () => {saveWorkers(); saveDates()}, img: saveProcess ? dualBallImg : saveImg, id: -8},
    ]

    return (
        <ul className="save-and-cancel">
            {
                buttons.map((item) => {
                    const {label, func, img, id} = item;
                    
                        return (
                            <li className="save-and-cancel__item" key = {id}>
                                <button
                                    className="save-and-cancel__item-btn"
                                    onClick={() => func()}>   
                                        <img className="save-and-cancel__item-btn-img" src={img} alt={label}></img>
                                        <span className="save-and-cancel__item-btn-text">
                                            {label}
                                        </span>
                                </button>
                            </li>
                    )
                })
            }
        </ul>
    )

}

SaveAndCancel.propTypes = {
    selectedWorker: PropTypes.number,
    selectedDay: PropTypes.number,
    makeWorkingBtnActive: PropTypes.bool,
}

const mapDispatchToProps = {
    ClearAllDays,
    WorkersLoaded,
    DatesLoaded
}

const mapStateToProps = ({workers, dates, currentYear, currentMonth}) => {
    return {
        workers,
        dates,
        currentYear,
        currentMonth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveAndCancel);