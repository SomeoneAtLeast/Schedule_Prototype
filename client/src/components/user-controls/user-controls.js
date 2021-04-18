import React, { useContext } from "react";
import {connect} from "react-redux"
import {useHistory} from "react-router";

import "./user-controls.scss"

import logoutImg from "./../../global-imgs/logout.svg"
import RegImg from "./../../global-imgs/registration.svg"

import Context from "../../context";

const UserControls = () => {
    const history = useHistory();
    const auth = useContext(Context);

    const OnLogout = () => {
        auth.logout();
        history.push("/auth");
    }

    const buttons = [
        {name: "register-user",  label: "Добавить сотрудника", funk: null, img: RegImg, id: -1},
        {name: "exit",  label: "Выйти", funk: OnLogout, img: logoutImg, id: -2},
    ]
    

    return (
        <ul className="user-controls">
            {
                buttons.map((item) => {
                    const {label, img, funk, id} = item;
                    return (
                        <li className="user-controls__item" key = {id}>
                            <button
                                className="user-controls__item-btn"
                                onClick={funk}>   
                                    <img className="user-controls__item-btn-img" src={img} alt={label}></img>
                                    <span className="user-controls__item-btn-text">
                                        {label}
                                    </span>
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}


export default connect()(UserControls);