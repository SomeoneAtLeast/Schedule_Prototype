import React from "react";
import "./not-ready-stub.scss";
import sprout from "./sprout.svg"

const NotReadyStub = () => {
    return (
        <div className="not-ready-stub">
            <img className="not-ready-stub__img" src={sprout} alt="Панда"/>
            <span className="not-ready-stub__text">
                В будущем тут что-то будет..
            </span>
        </div>
    )
}

export default NotReadyStub;