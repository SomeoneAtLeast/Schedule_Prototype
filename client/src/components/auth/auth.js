import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import {useHttp} from "../../hooks/http.hook"


import "./auth.scss"

import logo from "./../../global-imgs/logo.png"

const Auth = () => {

    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState ({
        email: "",
        password: ""
    })

    const [errorStatus, setError] = useState ({
        errorActive: false
    })


    useEffect(() => {

        if (error !== null) {
            console.log("не null")
            setError({
                errorActive: true 
            })
     
        }

        clearError();
    }, [error, clearError])


    const onChangeFormText = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onRegister = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form})
            console.log("Data", data)
        } catch (e) {

        }
    }

    const {errorActive} = errorStatus;
    
    if (errorActive) {
        console.log(errorActive)
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
                            onChange={onChangeFormText}/>
                    </label>
                    <label className="auth__input-wrapper">
                        <span className="auth__input-text">Пароль</span>
                        <input
                            className="auth__input" 
                            type="password"
                            name="password"
                            maxLength={40}
                            onChange={onChangeFormText}/>
                    </label>
                </div>
                <div className="auth__btns">
                    <button 
                            className="auth__input-btn"
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