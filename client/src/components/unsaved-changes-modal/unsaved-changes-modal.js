import React from "react";
import {connect} from "react-redux"
import {useHttp} from "../../hooks/http.hook"
import {WorkersLoaded, ClearAllDays, UnsavedChangesStatus, DatesLoaded} from "../../store/actions"

import "./unsaved-changes-modal.scss"

import cancelImg from "./../../global-imgs/cancel.svg"
import saveImg from "./../../global-imgs/save.svg"
import crossImg from "../../global-imgs/cross.svg"

const UnsavedChangesModal = ({workers, dates, currentYear, currentMonth, WorkersLoaded, ClearAllDays, UnsavedChangesStatus, className, DatesLoaded}) => {
    const {request} = useHttp();
    
    const saveWorkers = async () => {
        try {
            ClearAllDays();
            await request("/api/workers/workers-update", "POST", workers, {year: currentYear, month: currentMonth});
            UnsavedChangesStatus(false);
        } catch (e) {}
    }

    const saveDates = async () => {
        try {
            await request("/api/dates/dates-update", "POST", dates, {year: currentYear, month: currentMonth});
            UnsavedChangesStatus(false);
        } catch (e) {}
    }


    const getWorkers = async () => {
        try {
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            WorkersLoaded(data);
            UnsavedChangesStatus(false);
        } catch (e) {}
    };

    const getDates = async () => {
        try {
            const data = await request("/api/dates/dates", "GET", null, {year: currentYear});
            DatesLoaded(data);
            UnsavedChangesStatus(false);
        } catch (e) {}
    };

    return (
        <div className="unsaved-changes-modal-wrapper">
            <div className={"unsaved-changes-modal " + className}>
                <button className="unsaved-changes-modal__btn-exit">
                    <img 
                        className="unsaved-changes-modal__btn-exit-img"
                        src={crossImg}
                        alt="Закрыть"
                        onClick={() => UnsavedChangesStatus(false)}/>
                </button>
                <span className="unsaved-changes-modal__text">У вас есть несохраненные изменения</span>
                <button 
                    className="unsaved-changes-modal__btn"
                    onClick={() => {getWorkers(); getDates()}}>
                    <img 
                        className="unsaved-changes-modal__btn-img"
                        src={cancelImg}
                        alt="Отменить изменения"/>
                    <span className="unsaved-changes-modal__btn-text">Сбросить</span>
                </button>
                <button 
                    className="unsaved-changes-modal__btn"
                    onClick={() => {saveWorkers(); saveDates()}}>
                    <img 
                        className="unsaved-changes-modal__btn-img"
                        src={saveImg}
                        alt="Сохранить"/>
                    <span className="unsaved-changes-modal__btn-text">Сохранить</span>     
                </button>
            </div>
        </div>
    )

}

const mapDispatchToProps = {
    WorkersLoaded,
    ClearAllDays,
    UnsavedChangesStatus, 
    DatesLoaded
}

const mapStateToProps = ({workers, currentYear, currentMonth, dates}) => {
    return {
        workers,
        dates,
        currentYear,
        currentMonth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnsavedChangesModal);