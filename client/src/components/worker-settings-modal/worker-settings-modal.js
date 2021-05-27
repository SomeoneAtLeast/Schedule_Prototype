import React, {useState} from "react";
import {connect} from "react-redux"

import "./worker-settings-modal.scss"

import crossImg from "../../global-imgs/cross-black.svg"
import worker from "../../global-imgs/worker.svg"

const WorkerSettingsModal = ({workers, selectedWorker, currentMonth, setShowWorkerSettingsModal}) => {

    const [userData, setUserData] = useState ({
        workerName: workers[selectedWorker].name,
        workerType: "Руководитель",
    })

    const onChangeFormText = e => {
        setUserData({
            ...userData,
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
                    Сотрудник
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
                    value={userData.workerName}/>
                </label>
                <label className="worker-settings-modal__form-input-label">
                    <span className="worker-settings-modal__form-input-name">Тип</span>
                    <select 
                        className="worker-settings-modal__form-select"
                        name="workerType" 
                        value={userData.workerType} 
                        onChange={onChangeFormText}>
                            <option className="worker-settings-modal__form-select-option">Руководитель</option>
                            <option className="worker-settings-modal__form-select-option">Групп Лидер</option>
                            <option className="worker-settings-modal__form-select-option">Наставник</option>
                            <option className="worker-settings-modal__form-select-option">Дневная смена SMM</option>
                            <option className="worker-settings-modal__form-select-option">Ночная смена SMM</option>
                            <option className="worker-settings-modal__form-select-option">КМ</option>
                    </select>
                </label>
                <label className="worker-settings-modal__form-input-label">
                    <span className="worker-settings-modal__form-input-name">Смена</span>
                    <select 
                        className="worker-settings-modal__form-select"
                        name="workerType" 
                        value={userData.workerType} 
                        onChange={onChangeFormText}>
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
            </form>
        </div>
    )

}

const mapDispatchToProps = {
    // WorkersLoaded,
    // ClearAllDays,
    // UnsavedChangesStatus
}

const mapStateToProps = ({workers, selectedWorker, currentMonth}) => {
    return {
        workers,
        selectedWorker,
        currentMonth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerSettingsModal);