import React, {useState, useContext} from "react";
import {useHttp} from "../../hooks/http.hook"
import {connect} from "react-redux"
import Context from "../../context";

import "./auth.scss"

import logo from "./../../global-imgs/logo.png"

const Auth = () => {

    const auth = useContext(Context);
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

    const onLogin = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form});
            auth.login(data.token, data.userId);
            clearMessage()
        } catch (e) {}
    }
    
    return (
        <div className="auth">
            <main className="auth__content">
                <div className="auth__content-logo-wrapper">
                    <img
                        className="auth__content-logo"
                        src={logo} 
                        alt="Логотип"/>
                    <span className="auth__content-logo-text">ГРАФИК</span>
                </div>
                <div className="auth__inputs">
                    <label className="auth__input-wrapper">
                        <span className="auth__input-text">Логин</span>
                        <input
                            className="auth__input" 
                            type="text"
                            name="email"
                            maxLength={40}
                            onChange={onChangeFormText}
                            onFocus={clearMessage}/>
                    </label>
                    <label className="auth__input-wrapper">
                        <span className="auth__input-text">Пароль</span>
                        <input
                            className="auth__input" 
                            type="password"
                            name="password"
                            maxLength={40}
                            onChange={onChangeFormText}
                            onFocus={clearMessage}/>
                    </label>
                </div>
                <div className="auth__error">
                    <span className="auth__error-text">
                        {error}
                    </span>
                </div>
                <div className="auth__success">
                    <span className="auth__success-text">
                        {success}
                    </span>
                </div>
                <div className="auth__btns">
                        <button 
                            className="auth__input-btn"
                            onClick={onLogin}
                            disabled={loading}>
                            Войти
                        </button>
                        <button 
                            className="auth__input-btn"
                            onClick={onRegister}
                            disabled={loading}>
                            Зарегистрироваться
                        </button>
                </div>
            </main>
        </div>
    )
}

export default connect()(Auth);