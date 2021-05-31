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
            workerType = "Ночная смена SMM"

            return
        }

        if (targetMonthlyShiftData.kmWorker) {
            workerType = "КМ"

            return
        }

        if (targetMonthlyShiftData.groupLeader) {
            workerType = "Групп Лидер"

            return
        }

        if (targetMonthlyShiftData.director) {
            workerType = "Руководитель"

            return
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

    return (
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
                    maxLength={32}
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
                            <option className="worker-settings-modal__form-select-option">Руководитель</option>
                            <option className="worker-settings-modal__form-select-option">Групп Лидер</option>
                            <option className="worker-settings-modal__form-select-option">Дневная смена SMM</option>
                            <option className="worker-settings-modal__form-select-option">Ночная смена SMM</option>
                            <option className="worker-settings-modal__form-select-option">КМ</option>
                    </select>
                </label>
                <label className="worker-settings-modal__form-input-label worker-settings-modal__form-select-label">
                    <span className="worker-settings-modal__form-input-name">Смена</span>
                    <select 
                        className="worker-settings-modal__form-select"
                        name="workingShiftMonth" 
                        value={workerData.workingShiftMonth} 
                        onChange={onChangeFormText}>
                            <option className="worker-settings-modal__form-select-option">Не задано</option>
                            <option className="worker-settings-modal__form-select-option">09-18</option>
                            <option className="worker-settings-modal__form-select-option">11-20</option>
                            <option className="worker-settings-modal__form-select-option">08-20</option>
                            <option className="worker-settings-modal__form-select-option">09-21</option>
                            <option className="worker-settings-modal__form-select-option">10-22</option>
                            <option className="worker-settings-modal__form-select-option">11-23</option>
                            <option className="worker-settings-modal__form-select-option">12-24</option>
                            <option className="worker-settings-modal__form-select-option">14-02</option>
                            <option className="worker-settings-modal__form-select-option">21-09</option>
                    </select>
                </label>
                <label className="worker-settings-modal__form-input-label worker-settings-modal__form-select-label">
                    <span className="worker-settings-modal__form-input-name">Сегмент</span>
                    <select 
                        className="worker-settings-modal__form-select"
                        name="segment" 
                        value={workerData.segment} 
                        onChange={onChangeFormText}>
                            <option className="worker-settings-modal__form-select-option">Не задано</option>
                            <option className="worker-settings-modal__form-select-option">А</option>
                            <option className="worker-settings-modal__form-select-option">Г</option>
                            <option className="worker-settings-modal__form-select-option">Н_Г</option>
                            <option className="worker-settings-modal__form-select-option">Ж</option>
                            <option className="worker-settings-modal__form-select-option">Ж_</option>
                            <option className="worker-settings-modal__form-select-option">3</option>
                            <option className="worker-settings-modal__form-select-option">К</option>
                            <option className="worker-settings-modal__form-select-option">К_</option>
                            <option className="worker-settings-modal__form-select-option">Н</option>
                            <option className="worker-settings-modal__form-select-option">Н_</option>
                            <option className="worker-settings-modal__form-select-option">О</option>
                            <option className="worker-settings-modal__form-select-option">О_</option>
                            <option className="worker-settings-modal__form-select-option">О_1</option>
                            <option className="worker-settings-modal__form-select-option">Э</option>
                    </select>
                </label>
            </form>
            <button 
                className="worker-settings-modal__btn"
                onClick={() => {SaveWorkerSettings(workerData); setShowWorkerSettingsModal(false)}}>
                    Сохранить
            </button>
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