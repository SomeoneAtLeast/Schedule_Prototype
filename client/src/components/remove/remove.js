import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook"
import {connect} from "react-redux"
import {GetCandidatesForDeletion} from "../../store/actions"

import "./remove.scss"

import DualBall from "../dual-ball";

import crossImg from "../../global-imgs/cross-black.svg"

const Remove = ({candidatesForDeletion, GetCandidatesForDeletion, setShowRemove}) => {

    const {loading, error, request, clearError} = useHttp();

    const [candidatesForDeletionReceived, setCandidatesForDeletionReceived] = useState(false);
    const [canRemove, setСanRemove] = useState(false);
    const [removeError, setRemoveError] = useState(false);
    const [shifter, setShifter] = useState(false);
    const [fromMonth, setFromMonth] = useState(null);

    const [form, setForm] = useState ({
        name: "",
        id: ""
    })
    console.log(form.name)
    const [endDate, setEndDate] = useState ({
        workEndYear: 1,
        workEndMonth: "Январь",
    })

    const [targetWorkerData, setTargetWorker] = useState ({
        workerIndex: 0,
        yearIndex: 0
    })

    const [success, setSuccess] = useState ("")

    const notSelectedError = removeError ? "Что-то не выбрано" : "";


    const onChangeFormText = e => {
        setForm({
            ...form,
            [e.target.name]: e.target[e.target.selectedIndex].text,
            id: Number(e.target[e.target.selectedIndex].value)
        })
    }

    const onChangeEndYear = e => {
        setEndDate({
            ...endDate,
            workEndYear: Number(e.target[e.target.selectedIndex].value)
        })
    }

    const onChangeEndMonth = e => {
        setEndDate({
            ...endDate,
            workEndMonth: e.target.value,
        })
    }

    const onChangeTargetWorkerIndex = e => {
        const workerIndex = candidatesForDeletion.findIndex(elem => elem.id === Number(e.target[e.target.selectedIndex].value)); 
        setTargetWorker({
            ...targetWorkerData,
            workerIndex
        })
    }

    const onChangeTargetYearIndex = e => {
        const yearIndex = candidatesForDeletion[targetWorkerData.workerIndex].yearsAndMonths.findIndex(elem => elem.id === Number(e.target[e.target.selectedIndex].value)); 
        setTargetWorker({
            ...targetWorkerData,
            yearIndex
        })
    }

    const clearMessage = () => {
        clearError();
        setSuccess("");
    }

    useEffect(() => {
        const getWorkersNames = async () =>  {
            try {
                setCandidatesForDeletionReceived(false)
                const candidatesForDeletionFromServer = await request("/api/workers/workers-candidates-for-deletion", "GET");
                GetCandidatesForDeletion(candidatesForDeletionFromServer);
                setCandidatesForDeletionReceived(true);
            } catch (e) {}
        }

        getWorkersNames();
    }, [GetCandidatesForDeletion, request, shifter])

    useEffect(() => {
        if (candidatesForDeletionReceived && candidatesForDeletion[0]) {
            setForm({
                name: candidatesForDeletion[0].name,
                id: candidatesForDeletion[0].id
            })
        }
    }, [candidatesForDeletionReceived, candidatesForDeletion])


    const onRemove = async () => {
        if (!form.name) {
            return
        }

        try {
            if (fromMonth) {
                await request("/api/workers/remove-worker", "POST", {name: form.name, id: form.id, workEndYear: endDate.workEndYear, workEndMonth: endDate.workEndMonth });
            } else {
                await request("/api/workers/remove-worker", "POST", {name: form.name, id: form.id, workEndYear: null, workEndMonth: null});
            }

            setForm({
                name: "",
                id: ""
            })

            setEndDate({
                workEndYear: 1,
                workEndMonth: "Январь",
            });

            setTargetWorker({
                ...targetWorkerData,
                workerIndex: 0,
                yearIndex: 0
            });

           setShifter(!shifter);
           setSuccess("Успешно удален");
        } catch (e) {}
    }

    const fromMonthBlock = () => {
        return (
            <div className="remove__form-from-month">
                <div className="remove__form-from-month-data">
                    <span className="remove__form-from-month-data-name">Удалить с</span>
                    <label className="remove__form-select-wrapper">
                        <select 
                            className="remove__form-select"
                            name="workEndYear" 
                            value={endDate.workEndYear} 
                            onChange={(e) => {onChangeEndYear(e); onChangeTargetYearIndex(e)}}
                            onFocus={() => {clearMessage()}}>
                                {   candidatesForDeletion[0] ?
                                    candidatesForDeletion[targetWorkerData.workerIndex].yearsAndMonths.map((item) => {
                                        return (
                                            <option className="remove__form-select-option" value={item.id} key={item.years}>{item.years}</option>
                                        )
                                    })
                                    :
                                    <option className="remove__form-select-option" key={"-"}>-</option>
                                }
                        </select>
                    </label>
                    <label className="remove__form-select-wrapper">
                        <select 
                            className="remove__form-select"
                            name="workEndMonth" 
                            value={endDate.workEndMonth} 
                            onChange={onChangeEndMonth}
                            onFocus={() => {clearMessage()}}>
                                {   candidatesForDeletion[0] ?
                                    candidatesForDeletion[targetWorkerData.workerIndex].yearsAndMonths[targetWorkerData.yearIndex].months.map((item) => {
                                        return (
                                            <option className="remove__form-select-option" key={item}>{item}</option>
                                        )
                                    })
                                    :
                                    <option className="remove__form-select-option" key={"-"}>-</option>
                                }
                        </select>
                    </label>
                </div>
            </div>
        )
    }

    return (
        <div className="remove">
            <main className="remove__content">
                <div className="remove__content-title">
                    <span className="remove__content-title-text">Удаление сотрудника</span>
                </div>
                <form className="remove__form">
                    <label className="remove__form-select-wrapper">
                        <span className="remove__form-input-name">Сотрудник</span>
                        {!candidatesForDeletionReceived ? <DualBall className={"dual-ball--remove"}/> : 
                        <select 
                            className="remove__form-select"
                            name="name" 
                            value={form.id} 
                            onChange={(e) => {onChangeFormText(e); onChangeTargetWorkerIndex(e)}}
                            onFocus={() => {clearMessage(); setRemoveError(false)}}>
                                {   candidatesForDeletion[0] ?
                                    candidatesForDeletion.map((item) => {
                                        return (
                                            <option className="remove__form-select-option" value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    })
                                    :
                                    <option className="remove__form-select-option" value={"Никого нет"} key={"Никого нет"}>Никого нет</option>
                                }
                        </select>
                        }
                    </label>
                    <div className="remove__form-radio-title">Варианты удаления</div>
                    <div className="remove__form-radio-btns">
                        <input
                            className="remove__form-radio" 
                            type="radio"
                            name="deletion-type"
                            value="completely"
                            id="completely"
                            onInput={() => {clearMessage(); setRemoveError(false);  setFromMonth(false); setСanRemove(true)}}/>
                        <label
                            className="remove__form-radio-wrapper"
                            htmlFor="completely">
                            <span className="remove__form-input-name">Полностью</span>
                        </label>
                        <input
                            className="remove__form-radio" 
                            type="radio"
                            name="deletion-type"
                            value="from-month"
                            id="from-month"
                            onInput={() => {clearMessage(); setRemoveError(false); setFromMonth(true); setСanRemove(true)}}/>
                        <label
                            className="remove__form-radio-wrapper"
                            htmlFor="from-month">
                            <span className="remove__form-input-name">С выбранного месяца</span>
                        </label>
                    </div>
                    {fromMonth ? fromMonthBlock() : null}
                </form>
                <div className="remove__error">
                    <span className="remove__error-text">
                        {error}
                        {notSelectedError}
                    </span>
                </div>
                <div className="remove__success">
                    <span className="remove__success-text">
                        {success}
                    </span>
                </div>
                <div className="remove__btn-wrapper">
                    <button 
                        className="remove__btn"
                        onClick={canRemove ? onRemove : () => setRemoveError(true)}
                        disabled={loading}>
                        Удалить
                    </button>
                </div>
                <button className="remove__exit"
                onClick={() => setShowRemove(false)}>
                        <img 
                            className="remove__exit-img"
                            src={crossImg}
                            alt="Выйти"/>
                </button>
            </main>
        </div>
    )
}

const mapDispatchToProps = {
    GetCandidatesForDeletion
}

const mapStateToProps = ({candidatesForDeletion}) => {
    return {
        candidatesForDeletion,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Remove);