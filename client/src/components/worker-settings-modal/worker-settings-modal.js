import React, {useState} from "react";
import {connect} from "react-redux"
import {SaveWorkerSettings} from "../../store/actions"

import "./worker-settings-modal.scss"

import crossImg from "../../global-imgs/cross.svg"
import worker from "../../global-imgs/worker.svg"

const WorkerSettingsModal = ({workers, selectedWorker, currentMonth, setShowWorkerSettingsModal, SaveWorkerSettings}) => {

    const workerTypeConverter = () => {
        const targetMonthlyShiftData = workers[selectedWorker].years[0].months[currentMonth - 1].monthlyShiftData;
        let workerType = "Дневная смена SMM";

        if (targetMonthlyShiftData.nightWorker) {
            return workerType = "Ночная смена SMM"
        }

        if (targetMonthlyShiftData.kmWorker) {
            return workerType = "КМ"
        }

        if (targetMonthlyShiftData.groupLeader) {
            return workerType = "Групп Лидер"
        }

        if (targetMonthlyShiftData.director) {
            return workerType = "Руководитель"
        }

        return workerType
    }

    const workingShiftMonth = workers[selectedWorker].years[0].months[currentMonth - 1].monthlyShiftData.workingShiftMonth;
    const segment = workers[selectedWorker].years[0].months[currentMonth - 1].additionalInformation[1].value;

    const [workerData, setworkerData] = useState ({
        workerName: workers[selectedWorker].name,
        workerType: workerTypeConverter(),
        workingShiftMonth: workingShiftMonth ? workingShiftMonth : "Не задано",
        segment: segment ? segment : "Не задано",
    })
    

    const onChangeFormText = e => {
        setworkerData({
            ...workerData,
            [e.target.name]: e.target.value
        })
    }

    const workerTypes = ["Руководитель", "Групп Лидер", "Дневная смена SMM", "Ночная смена SMM", "КМ"];
    const workingShifts = ["Не задано", "09-18", "11-20", "08-20", "09-21", "10-22", "11-23", "12-24", "14-02", "21-09"];  
    const segments = ["Не задано", "А", "Г", "Н_Г", "Ж", "Ж_", "3", "К", "К_", "Н", "Н_", "О", "О_", "О_1", "Э"];  

    return (
        <div className="worker-settings-modal-wrapper">
            <div className="worker-settings-modal">
                <button 
                    className="worker-settings-modal__exit-btn"
                    onClick={() => setShowWorkerSettingsModal(false)}>
                    <img 
                        className="worker-settings-modal__exit-btn-img"
                        src={crossImg}
                        alt="Выйти"/>
                </button>
                <div className="worker-settings-modal__title">
                    <img 
                        className="worker-settings-modal__title-img"
                        src={worker}
                        alt="Иконка сотрудника"/>
                    <span className="worker-settings-modal__title-text">
                        Карточка сотрудника
                    </span>
                </div>
                <form className="worker-settings-modal__form">
                    <label className="worker-settings-modal__form-input-label">
                        <span className="worker-settings-modal__form-input-name">ФИО</span>
                        <input
                        className="worker-settings-modal__form-input"
                        type="text"
                        name="workerName"
                        maxLength={31}
                        onChange={onChangeFormText}
                        value={workerData.workerName}/>
                    </label>
                    <label className="worker-settings-modal__form-input-label worker-settings-modal__form-select-label">
                        <span className="worker-settings-modal__form-input-name">Тип</span>
                        <select 
                            className="worker-settings-modal__form-select"
                            name="workerType" 
                            value={workerData.workerType} 
                            onChange={onChangeFormText}>
                                {
                                    workerTypes.map((item) => {
                                        return (
                                            <option className="worker-settings-modal__form-select-option">{item}</option>
                                        )
                                    })
                                }
                        </select>
                    </label>
                    <label className="worker-settings-modal__form-input-label worker-settings-modal__form-select-label">
                        <span className="worker-settings-modal__form-input-name">Смена</span>
                        <select 
                            className="worker-settings-modal__form-select"
                            name="workingShiftMonth" 
                            value={workerData.workingShiftMonth} 
                            onChange={onChangeFormText}>
                                {
                                    workingShifts.map((item) => {
                                        let classNames = "worker-settings-modal__form-select-shifts-option";

                                        if (item !== "Не задано") {
                                            classNames += ` worker-settings-modal__form-select-shifts-option-${item}`
                                        }

                                        return (
                                            <option className={classNames}>{item}</option>
                                        )
                                    })
                                }
                        </select>
                    </label>
                    <label className="worker-settings-modal__form-input-label worker-settings-modal__form-select-label">
                        <span className="worker-settings-modal__form-input-name">Сегмент</span>
                        <select 
                            className="worker-settings-modal__form-select"
                            name="segment" 
                            value={workerData.segment} 
                            onChange={onChangeFormText}>
                                {
                                    segments.map((item) => {
                                        return (
                                            <option className="worker-settings-modal__form-select-option">{item}</option>
                                        )
                                    })
                                }
                        </select>
                    </label>
                </form>
                <button 
                    className="worker-settings-modal__btn"
                    onClick={() => {SaveWorkerSettings(workerData); setShowWorkerSettingsModal(false)}}>
                        Сохранить
                </button>
            </div>
        </div>
    )

}

const mapDispatchToProps = {
    SaveWorkerSettings
}

const mapStateToProps = ({workers, selectedWorker, currentMonth}) => {
    return {
        workers,
        selectedWorker,
        currentMonth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerSettingsModal);