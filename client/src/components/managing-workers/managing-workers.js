import React, {useState} from "react";
import {connect} from "react-redux";

import "./managing-workers.scss";

import Register from "../register";

import RegistrationImg from "./../../global-imgs/registration.svg";

const ManagingWorkers = () => {

    const [showRegister, setShowRegister] = useState(false);

    const buttons = [
        {name: "managing-workers",  label: "Добавить сотрудника", funk: setShowRegister, img: RegistrationImg, id: -1},
    ]
    
    return (
        <div className="managing-workers">
            <main className="managing-workers__content">
                <div className="managing-workers__list-wrapper">
                    <ul className="managing-workers__list">
                        {
                            buttons.map((item) => {
                                const {label, img, funk, id} = item;
                                    return (
                                        <li className="managing-workers__list-item" key = {id}>
                                            <button
                                                className="managing-workers__list-item-btn"
                                                onClick={() => funk(true)}>   
                                                    <img className="managing-workers__list-item-btn-img" src={img} alt={label}></img>
                                                    <span className="managing-workers__list-item-btn-text">
                                                        {label}
                                                    </span>
                                            </button>
                                        </li>
                                    )
                            })
                        }
                    </ul>
                </div>
                <div className="managing-workers__worker-settings">
                    {showRegister ? <Register setShowRegister={setShowRegister}/> : null}
                </div>
            </main>
        </div>
    )
}

export default connect()(ManagingWorkers);