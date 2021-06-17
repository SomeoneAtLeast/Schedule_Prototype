import React, {useState} from "react";
import {connect} from "react-redux";

import "./managing-workers.scss";

import Register from "../register";
import Remove from "../remove";

import RegistrationImg from "./../../global-imgs/registration.svg";
import RemoveImg from "./../../global-imgs/remove.svg";

const ManagingWorkers = () => {

    const [showRegister, setShowRegister] = useState(false);
    const [showRemove, setShowRemove] = useState(false);

    const buttons = [
        {name: "managing-workers",  label: "Добавить сотрудника", funk: () => {setShowRegister(true); setShowRemove(false)}, img: RegistrationImg, id: -1},
        {name: "managing-workers",  label: "Удалить сотрудника", funk: () => {setShowRemove(true); setShowRegister(false)}, img: RemoveImg, id: -2},
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
                                                onClick={funk}>   
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
                    {showRemove ? <Remove setShowRemove={setShowRemove}/> : null}
                </div>
            </main>
        </div>
    )
}

export default connect()(ManagingWorkers);