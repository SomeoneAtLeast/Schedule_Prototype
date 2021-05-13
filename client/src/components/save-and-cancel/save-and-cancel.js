import React, {useState} from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {useHttp} from "../../hooks/http.hook"
import {ClearAllDays, WorkersLoaded} from "../../store/actions"

import "./save-and-cancel.scss"

import cancelImg from "./../../global-imgs/cancel.svg"
import saveImg from "./../../global-imgs/save.svg"
import dualBallImg from "../dual-ball/dual-ball.svg"

const SaveAndCancel= ({workers, currentYear, currentMonth, ClearAllDays, WorkersLoaded}) => {

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

    const getWorkers = async () => {
        try {
            setLoadingWorkers(true)
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            WorkersLoaded(data);
            setLoadingWorkers(false)
        } catch (e) {}
    };

    const buttons = [
        {name: "save",  label: "Отменить изменения", func: getWorkers, img:  loadingWorkers ? dualBallImg : cancelImg, id: -7},
        {name: "save",  label: "Сохранить", func: saveWorkers, img: saveProcess ? dualBallImg : saveImg, id: -8},
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
    WorkersLoaded
}

const mapStateToProps = ({workers, currentYear, currentMonth}) => {
    return {
        workers,
        currentYear,
        currentMonth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveAndCancel);