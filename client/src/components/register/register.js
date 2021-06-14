import React, {useState} from "react";
import {useHttp} from "../../hooks/http.hook"
import {connect} from "react-redux"

import "./register.scss"

import crossImg from "../../global-imgs/cross-black.svg"

const Register = ({setShowRegister}) => {

    const {loading, error, success, request, clearError, clearSuccess} = useHttp();

    const [canRegister, setСanRegister] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [inSchedule, setInSchedule] = useState(null);

    const [form, setForm] = useState ({
        email: "",
        password: "",
        role: "Специалист"
    })

    const roles = ["Специалист", "Супервайзер"];
    const notSelectedError = registerError ? "Что-то не заполнено / не выбрано" : "";

    const onChangeFormText = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clearMessage = () => {
        clearError()
        clearSuccess()
    }

    const onRegister = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form});
            console.log(data)
        } catch (e) {}
    }

    return (
        <div className="register">
            <main className="register__content">
                <div className="register__content-title">
                    <span className="register__content-title-text">Регистрация сотрудника</span>
                </div>
                <form className="register__form">
                    <label className="register__form-input-wrapper">
                        <span className="register__form-input-name">Email</span>
                        <input
                            className="register__form-input" 
                            type="text"
                            name="email"
                            maxLength={40}
                            onChange={onChangeFormText}
                            onFocus={() => {clearMessage(); setRegisterError(false)}}/>
                    </label>
                    <label className="register__form-input-wrapper">
                        <span className="register__form-input-name">Пароль</span>
                        <input
                            className="register__form-input" 
                            type="password"
                            name="password"
                            maxLength={40}
                            onChange={onChangeFormText}
                            onFocus={() => {clearMessage(); setRegisterError(false)}}/>
                    </label>
                    <label className="register__form-select-wrapper">
                        <span className="register__form-input-name">Роль</span>
                        <select 
                            className="register__form-select"
                            name="role" 
                            value={form.role} 
                            onChange={onChangeFormText}
                            onFocus={() => {clearMessage(); setRegisterError(false)}}>
                                {
                                    roles.map((item) => {
                                        return (
                                            <option className="register__form-select-option" key={item}>{item}</option>
                                        )
                                    })
                                }
                        </select>
                    </label>
                    <div className="register__form-radio-title">Добавить сотрудника в график?</div>
                    <div className="register__form-radio-btns">
                        <input
                            className="register__form-radio" 
                            type="radio"
                            name="in-schedule"
                            value="yes"
                            id="yes"/>
                        <label
                            className="register__form-radio-wrapper"
                            htmlFor="yes"
                            onClick={() => setInSchedule(true)}
                            onFocus={() => {clearMessage(); setRegisterError(false); setСanRegister(true)}}>
                            <span className="register__form-input-name">Да</span>
                        </label>
                        <input
                            className="register__form-radio" 
                            type="radio"
                            name="in-schedule"
                            value="no"
                            id="no"/>
                        <label
                            className="register__form-radio-wrapper"
                            htmlFor="no"
                            onClick={() => setInSchedule(false)}
                            onFocus={() => {clearMessage(); setRegisterError(false); setСanRegister(true)}}>
                            <span className="register__form-input-name">Нет</span>
                        </label>
                    </div>
                </form>
                <div className="register__error">
                    <span className="register__error-text">
                        {error}
                        {notSelectedError}
                    </span>
                </div>
                <div className="register__success">
                    <span className="register__success-text">
                        {success}
                    </span>
                </div>
                <div className="register__btn-wrapper">
                    <button 
                        className="register__btn"
                        onClick={canRegister ? onRegister : () => setRegisterError(true)}
                        disabled={loading}>
                        Зарегистрировать
                    </button>
                </div>
                <button className="register__exit"
                onClick={() => setShowRegister(false)}>
                        <img 
                            className="register__exit-img"
                            src={crossImg}
                            alt="Выйти"/>
                </button>
            </main>
        </div>
    )
}

export default connect()(Register);