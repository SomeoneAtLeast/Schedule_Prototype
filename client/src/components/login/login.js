import React, {useState, useContext} from "react";
import {useHttp} from "../../hooks/http.hook"
import {connect} from "react-redux"
import Context from "../../context";

import "./login.scss"

import logo from "./../../global-imgs/logo.png"

const Login = () => {

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

    const onLogin = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form});
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onLogin();
          }
    }

    return (
        <div className="login">
            <main className="login__content">
                <div className="login__content-logo-wrapper">
                    <img
                        className="login__content-logo"
                        src={logo} 
                        alt="Логотип"/>
                    <span className="login__content-logo-text">ГРАФИК</span>
                </div>
                <div className="login__inputs">
                    <label className="login__input-wrapper">
                        <span className="login__input-text">Email</span>
                        <input
                            className="login__input" 
                            type="text"
                            name="email"
                            value={form.email}
                            maxLength={40}
                            onChange={onChangeFormText}
                            onFocus={clearMessage}
                            onKeyDown={onKeyDown}/>
                    </label>
                    <label className="login__input-wrapper">
                        <span className="login__input-text">Пароль</span>
                        <input
                            className="login__input" 
                            type="password"
                            name="password"
                            value={form.password}
                            maxLength={40}
                            onChange={onChangeFormText}
                            onFocus={clearMessage}
                            onKeyDown={onKeyDown}/>
                    </label>
                </div>
                <div className="login__error">
                    <span className="login__error-text">
                        {error}
                    </span>
                </div>
                <div className="login__success">
                    <span className="login__success-text">
                        {success}
                    </span>
                </div>
                <div className="login__btns">
                        <button 
                            className="login__input-btn"
                            onClick={onLogin}
                            disabled={loading}>
                            Войти
                        </button>
                </div>
            </main>
        </div>
    )
}

export default connect()(Login);