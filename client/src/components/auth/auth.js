import React, {useEffect, useState, useCallback} from "react";
import {connect} from "react-redux"
import {useHttp} from "../../hooks/http.hook"

import "./auth.scss"

const Auth = () => {
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState ({
        email: "",
        password: ""
    })

    const kek =     useCallback( () => {

        if(error !== null)
        console.log("ошибка")
    }, [error])

    useEffect(() => {
        kek();
        clearError();
    }, [error, kek, clearError])


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

    return (
        <div className="auth">
            <main className="auth__content">
                <div className="auth__inputs">
                    <label className="auth__input-wrapper">
                        <span className="auth__input-text">Логин</span>
                        <input 
                            type="email"
                            name="email"
                            onChange={onChangeFormText}/>
                    </label>
                    <label className="auth__input-wrapper">
                        <span className="auth__input-text">Пароль</span>
                        <input 
                            type="password"
                            name="password"
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