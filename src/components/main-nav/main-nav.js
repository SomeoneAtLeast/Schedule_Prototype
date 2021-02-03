/* eslint-disable react/prop-types */
import React, {Component} from "react";
import {Link} from 'react-router-dom';

import  "./main-nav.scss"
export default class MainNav extends Component {
    constructor() {
        super();

        this.state = {
            scheduleActive: true,
            arrangementsActive: false
        }
    }

    onActive (btnName) {
        if (btnName === "scheduleBtn") {
            this.setState({
                scheduleActive: true,
                arrangementsActive: false
            })
        } else if (btnName === "arrangementsBtn") {
            this.setState({
                scheduleActive: false,
                arrangementsActive: true
            })
        }
    }
    
    render() {
        let scheduleClass = "main-nav__item-link";
        let arrangementsClass = "main-nav__item-link";
        const {scheduleActive, arrangementsActive} = this.state;

        if (scheduleActive) {
            scheduleClass += " active-main-nav-btn";
        } 
        
        if (arrangementsActive) {
            arrangementsClass += " active-main-nav-btn";
        }

        return (
            <ul className="main-nav">
                <li 
                    className="main-nav__item"
                    onClick={() => this.onActive("scheduleBtn")}>
                    <Link to="/" className={scheduleClass}>
                        График
                    </Link>
                </li>
                <li 
                    className="main-nav__item"
                    onClick={() => this.onActive("arrangementsBtn")}>
                    <Link to="/arrangements/" className={arrangementsClass}>
                        Места
                    </Link>
                </li>
            </ul>
        )
    }
}