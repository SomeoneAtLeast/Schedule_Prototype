import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook"
import {connect} from "react-redux"
import {GetWorkersNamesOnServer} from "../../store/actions"

import "./remove.scss"

import DualBall from "../dual-ball";

import crossImg from "../../global-imgs/cross-black.svg"

const Remove = ({workersNamesOnServer, GetWorkersNamesOnServer, setShowRemove}) => {

    const {loading, error, request, clearError} = useHttp();

    const [namesReceived, setNamesReceived] = useState(false);
    const [canRemove, setСanRemove] = useState(false);
    const [removeError, setRemoveError] = useState(false);
    const [shifter, setShifter] = useState(false);
    const [completely, setCompletely] = useState(null);

    const [form, setForm] = useState ({
        name: "",
        id: ""
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

    const clearMessage = () => {
        clearError();
        setSuccess("");
    }


    useEffect(() => {
        const getWorkersNames = async () =>  {
            try {
                setNamesReceived(false)
                const workersNames = await request("/api/workers/workers-names", "GET");
                setForm({
                    name: workersNames[0].name,
                    id: workersNames[0].id
                })
                GetWorkersNamesOnServer(workersNames);
                setNamesReceived(true);
            } catch (e) {}
        }

        getWorkersNames();
    }, [GetWorkersNamesOnServer, request, shifter])

    const onRemove = async () => {
        try {
           await request("/api/workers/remove-worker", "POST", {name: form.name, id: form.id});
           setShifter(!shifter);
           setSuccess("Успешно удален");
        } catch (e) {}
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
                        {!namesReceived ? <DualBall className={"dual-ball--remove"}/> : 
                        <select 
                            className="remove__form-select"
                            name="name" 
                            value={form.id} 
                            onChange={onChangeFormText}
                            onFocus={() => {clearMessage(); setRemoveError(false)}}>
                                {
                                    workersNamesOnServer.map((item) => {
                                        return (
                                            <option className="remove__form-select-option" value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    })
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
                            onInput={() => {clearMessage(); setRemoveError(false);  setCompletely(true); setСanRemove(true)}}/>
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
                            onInput={() => {clearMessage(); setRemoveError(false); setCompletely(false); setСanRemove(false)}}/>
                        <label
                            className="remove__form-radio-wrapper"
                            htmlFor="from-month">
                            <span className="remove__form-input-name">С выбранного месяца</span>
                        </label>
                    </div>
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
    GetWorkersNamesOnServer
}

const mapStateToProps = ({workersNamesOnServer}) => {
    return {
        workersNamesOnServer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Remove);