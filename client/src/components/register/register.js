import React, {useState} from "react";
import { Link } from "react-router-dom";

import {useHttp} from "../../hooks/http.hook"
import {connect} from "react-redux"

import "./register.scss"

import crossImg from "../../global-imgs/cross-black.svg"

const Register = () => {

    const {loading, error, success, request, clearError, clearSuccess} = useHttp();

    const [form, setForm] = useState ({
        email: "",
        password: ""
    })

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

    
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onRegister();
          }
    }

    return (
        <div className="register">
            <main className="register__content">
                <div className="register__content-title">
                    <span className="register__content-title-text">Регистрация сотрудника</span>
                </div>
                <div className="register__inputs">
                    <label className="register__input-wrapper">
                        <span className="register__input-text">Логин</span>
                        <input
                            className="register__input" 
                            type="text"
                            name="email"
                            maxLength={40}
                            onChange={onChangeFormText}
                            onFocus={clearMessage}
                            onKeyDown={onKeyDown}/>
                    </label>
                    <label className="register__input-wrapper">
                        <span className="register__input-text">Пароль</span>
                        <input
                            className="register__input" 
                            type="password"
                            name="password"
                            maxLength={40}
                            onChange={onChangeFormText}
                            onFocus={clearMessage}
                            onKeyDown={onKeyDown}/>
                    </label>
                </div>
                <div className="register__error">
                    <span className="register__error-text">
                        {error}
                    </span>
                </div>
                <div className="register__success">
                    <span className="register__success-text">
                        {success}
                    </span>
                </div>
                <div className="register__btns">
                        <button 
                            className="register__input-btn"
                            onClick={onRegister}
                            disabled={loading}>
                            Зарегистрировать
                        </button>
                </div>
                    <Link to="/"
                        className="register__exit">
                            <img 
                                className="register__exit-img"
                                src={crossImg}
                                alt="Выйти"/>
                    </Link>
            </main>
        </div>
    )
}

export default connect()(Register);