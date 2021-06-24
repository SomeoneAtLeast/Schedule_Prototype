import React, { useContext } from "react";
import {connect} from "react-redux"
import {useHistory} from "react-router";
import { Link } from "react-router-dom";

import "./user-controls.scss"

import logoutImg from "./../../global-imgs/logout.svg"
import WorkersImg from "./../../global-imgs/workers.svg"

import Context from "../../context";

const UserControls = () => {
    const history = useHistory();
    const auth = useContext(Context);

    const OnLogout = () => {
        auth.logout();
        history.push("/auth");
    }

    const buttons = [
        {name: "managing-workers",  label: "Управление персоналом", funk: null, img: WorkersImg, id: -1},
        {name: "exit",  label: "Выйти", funk: OnLogout, img: logoutImg, id: -2},
    ]
    

    return (
        <ul className="user-controls">
            {
                buttons.map((item) => {
                    const {label, img, funk, name, id} = item;

                    if (auth.role !== "Супервайзер" && name === "managing-workers") {
                        return null
                    }

                    if (name === "managing-workers") {
                        return (
                            <li className="user-controls__item" key = {id}>
                                <Link to={"/managing-workers"}
                                    className="user-controls__item-link"
                                    onClick={funk}>   
                                        <img className="user-controls__item-link-img" src={img} alt={label}></img>
                                        <span className="user-controls__item-link-text">
                                            {label}
                                        </span>
                                </Link>
                            </li>
                        )
                    } else {
                        return (
                            <li className="user-controls__item" key = {id}>
                                <button
                                    className="user-controls__item-link"
                                    onClick={funk}>   
                                        <img className="user-controls__item-link-img" src={img} alt={label}></img>
                                        <span className="user-controls__item-link-text">
                                            {label}
                                        </span>
                                </button>
                            </li>
                        )
                    }

                })
            }
        </ul>
    )
}


export default connect()(UserControls);